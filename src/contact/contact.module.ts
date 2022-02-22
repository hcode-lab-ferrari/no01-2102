import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        ContactController,
    ],
    providers: [
        ContactService,
    ],
})
export class ContactModule { }
