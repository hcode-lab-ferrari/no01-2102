import { HttpService } from '@nestjs/axios';
import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validation-number';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
    constructor(
        private database: PrismaService,
        private httpService: HttpService,
    ) {}

    async searchCep(cep: string) {
        cep = cep.replace(/[^\d]+/g, '').substring(0, 8);

        const response = await lastValueFrom(
            this.httpService.request({
                method: 'GET',
                url: `https://viacep.com.br/ws/${cep}/json/`,
            }),
        );

        return response.data;
    }

    async isValidPerson(id: number, personId: number) {
        personId = isValidNumber(personId);

        const address = await this.findOne(isValidNumber(id));

        if (address.personId !== personId) {
            throw new BadRequestException('Operation is invalid.');
        }

        return true;
    }

    async findAll() {
        return this.database.address.findMany();
    }

    async findOne(id: number) {
        return this.database.address.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });
    }

    async findByPerson(personId: number) {
        return this.database.address.findMany({
            where: {
                personId: isValidNumber(personId),
            },
        });
    }

    async create(personId: number, data: CreateAddressDto) {
        personId = Number(personId);

        if (isNaN(personId)) {
            throw new NotFoundException('User not found.');
        }

        return this.database.address.create({
            data: {
                ...data,
                personId,
            },
        });
    }

    async update(id: number, personId: number, dataUpdate: UpdateAddressDto) {
        await this.isValidPerson(id, personId);

        return this.database.address.update({
            data: dataUpdate,
            where: {
                id: isValidNumber(id),
            },
        });
    }

    async delete(id: number, personId: number) {
        await this.isValidPerson(id, personId);

        return this.database.address.delete({
            where: {
                id: isValidNumber(id),
            },
        });
    }
}
