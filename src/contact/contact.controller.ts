import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {

    constructor(private contactService: ContactService) {}

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

}
