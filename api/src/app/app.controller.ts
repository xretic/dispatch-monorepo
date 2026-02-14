import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async getData() {
        return this.appService.getData();
    }
}
