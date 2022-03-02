import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    async show(@Param('id') id) {
        return this.userService.get(id);
    }

    @Get()
    async showByEmail(@Query('email') email) {
        return this.userService.getByEmail(email);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() body) {
        return this.userService.update(id, body);
    }
}
