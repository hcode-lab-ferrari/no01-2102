import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validation-number';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
    constructor(private prisma: PrismaService) {}

    isValidData(data: CreateServiceDto | UpdateServiceDto) {
        if (!data.name) {
            throw new BadRequestException('Name is required');
        }

        if (!data.description) {
            throw new BadRequestException('Description is required');
        }

        if (!data.price) {
            throw new BadRequestException('Price is required');
        }

        return data as CreateServiceDto;
    }

    async create(data: CreateServiceDto) {
        return this.prisma.services.create({
            data: this.isValidData(data),
        });
    }

    async findAll() {
        return this.prisma.services.findMany();
    }

    async findOne(id: number) {
        return this.prisma.services.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });
    }

    async update(id: number, data: UpdateServiceDto) {
        return this.prisma.services.update({
            where: {
                id: isValidNumber(id),
            },
            data: this.isValidData(data),
        });
    }

    async remove(id: number) {
        if (!(await this.findOne(id))) {
            throw new NotFoundException('ID not found');
        }

        return this.prisma.services.delete({
            where: {
                id: isValidNumber(id),
            },
        });
    }
}
