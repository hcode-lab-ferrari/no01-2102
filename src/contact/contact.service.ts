import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {

    async create(
        {name, email, message}:
        {name: string; email: string; message: string;}
    ) {


    }

}
