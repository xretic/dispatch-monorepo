import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.userService.user(id);
    }

    @Post()
    async create(@Body() body: { username: string; email: string; passwordHash?: string }) {
        return this.userService.createUser({
            username: body.username,
            email: body.email,
            passwordHash: body.passwordHash ?? null,
        });
    }
}
