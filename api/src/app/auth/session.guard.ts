import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SESSION_COOKIE } from './auth.constants';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private auth: AuthService) {}

    async canActivate(ctx: ExecutionContext) {
        const req = ctx.switchToHttp().getRequest();
        const sid = req.cookies?.[SESSION_COOKIE];

        if (!sid) throw new UnauthorizedException();

        const user = await this.auth.getUserBySessionId(sid);
        if (!user) throw new UnauthorizedException();

        req.user = user;
        return true;
    }
}
