import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { SESSION_TTL_DAYS } from './auth.constants';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register(input: { username: string; email: string; password: string }) {
        const exists = await this.prisma.user.findUnique({ where: { email: input.email } });
        if (exists) throw new BadRequestException('Email already in use');

        const passwordHash = await argon2.hash(input.password);

        const user = await this.prisma.user.create({
            data: {
                username: input.username,
                email: input.email,
                passwordHash,
            },
            select: { id: true, email: true, username: true, avatarUrl: true, createdAt: true },
        });

        return {
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl, // TODO: refactor this shit
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials');

        const ok = await argon2.verify(user.passwordHash, password);
        if (!ok) throw new UnauthorizedException('Invalid credentials');

        return user;
    }

    async createSession(params: { userId: string }) {
        const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

        const session = await this.prisma.session.create({
            data: {
                userId: params.userId,
                expiresAt,
            },
            select: { id: true, expiresAt: true },
        });

        return session;
    }

    async getUserBySessionId(sessionId: string) {
        const session = await this.prisma.session.findUnique({
            where: {
                id: sessionId,
                revokedAt: null,
                expiresAt: { gt: new Date() },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        avatarUrl: true,
                        createdAt: true,
                    },
                },
            },
        });

        return session?.user ?? null;
    }

    async revokeSession(sessionId: string) {
        await this.prisma.session.updateMany({
            where: { id: sessionId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
}
