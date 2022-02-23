import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {

    constructor(private db: PrismaService) {}

    async list() {

        return this.db.contact.findMany();

    }

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

        let personId: number;

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

            const contact = await this.db.contact.findFirst({
                where: {
                    email,
                },
            });

            if (contact) {
                personId = Number(contact.personId);
            } else {

                const newPerson = await this.db.person.create({
                    data: {
                        name,
                    },
                });
    
                personId = Number(newPerson.id);

            }

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
