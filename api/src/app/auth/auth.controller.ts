import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SESSION_COOKIE } from './auth.constants';

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('register')
    async register(@Body() body: { username: string; email: string; password: string }) {
        return this.auth.register(body);
    }

    @Post('login')
    async login(
        @Body() body: { email: string; password: string },
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.auth.validateUser(body.email, body.password);

        const session = await this.auth.createSession({ userId: user.id });

        res.cookie(SESSION_COOKIE, session.id, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // true in prod
            expires: session.expiresAt,
            path: '/',
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                avatarUrl: user.avatarUrl,
            },
        };
    }

    @Get('me')
    async me(@Req() req: Request) {
        const sid = (req as any).cookies?.[SESSION_COOKIE];
        if (!sid) return null;

        return this.auth.getUserBySessionId(sid);
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const sid = (req as any).cookies?.[SESSION_COOKIE];
        if (sid) await this.auth.revokeSession(sid);

        res.clearCookie(SESSION_COOKIE, { path: '/' });

        return { ok: true };
    }
}
