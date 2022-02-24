import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {

    constructor(private database: PrismaService) {}

    async create(personId: number, data: CreateAddressDto) {

        personId = Number(personId);
        
        if (isNaN(personId)) {
            throw new NotFoundException("User not found.");
        }

        return this.database.address.create({
            data: {
                ...data,
                personId,
            },
        });

    }

}
