import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {

    constructor(private db: PrismaService) {}

    async create({
        name,
        email,
        message,
    }: {
        name: string;
        email: string;
        message: string;
    }) {

        if (!email) {
            throw new BadRequestException("O e-mail é obrigatório.");
        }

        if (!message) {
            throw new BadRequestException("A mensagem é obrigatória.");
        }

        let personId;

        const user = await this.db.user.findUnique({
            where: {
                email,
            },
            select: {
                personId: true,
            },
        });

        if (user) {
            personId = Number(user.personId);
        } else {

            const person = await this.db.person.create({
                data: {
                    name,
                },
            });

            personId = Number(person.id);

        }

        return this.db.contact.create({
            data: {
                personId,
                email,
                message,
            },
        });

    }

}
