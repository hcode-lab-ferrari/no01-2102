import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {

    constructor(private db: PrismaService) {}

    async get(id: number) {

        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException("ID is not a number");
        }

        return this.db.contact.findUnique({
            where: {
                id,
            }
        });

    }

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

    async delete(id: number) {

        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException("Id is invalid");
        }

        if (!await this.get(id)) {
            throw new NotFoundException("ID not exists");
        }
        
        return this.db.contact.delete({
            where: {
                id,
            }
        });

    }

}
