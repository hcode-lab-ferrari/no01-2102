import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {

    constructor(private contactService: ContactService) {}

    @Get(':id')
    async show(@Param('id') id) {

        return this.contactService.get(Number(id));

    }

    @Get()
    async list() {

        return this.contactService.list();

    }

    @Post()
    async create(
        @Body('name') name,
        @Body('email') email,
        @Body('message') message
    ) {

        return this.contactService.create({
            message,
            name,
            email
        });

    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id) {

        await this.contactService.delete(Number(id));

    }

}
