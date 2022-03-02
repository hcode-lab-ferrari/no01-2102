import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validation-number';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleGateway } from './schedule.gateway';

@Injectable()
export class ScheduleService {
    constructor(
        private prisma: PrismaService,
        private socket: ScheduleGateway,
    ) {}

    async isValidPerson(id: number, personId: number) {
        personId = isValidNumber(personId);

        const schedule = await this.findOne(isValidNumber(id));

        if (schedule.personId !== personId) {
            throw new BadRequestException('Operation is invalid.');
        }

        return true;
    }

    async findAll() {
        return this.prisma.schedule.findMany();
    }

    async findByPerson(id: number) {
        return this.prisma.schedule.findMany({
            where: {
                personId: isValidNumber(id),
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.schedule.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });
    }

    async create(
        personId: number,
        {
            timeOptionId,
            billingAddressId,
            paymentSituationId,
            scheduleAt,
            total,
            installments,
            services,
        }: CreateScheduleDto,
    ) {
        scheduleAt = new Date(scheduleAt);
        timeOptionId = isValidNumber(timeOptionId);
        billingAddressId = isValidNumber(billingAddressId);

        const timeOption = await this.prisma.timeOption.findUnique({
            where: {
                id: timeOptionId,
            },
        });

        if (!timeOption) {
            throw new NotFoundException('Time option not found.');
        }

        const address = await this.prisma.address.findUnique({
            where: {
                id: billingAddressId,
            },
        });

        if (!address) {
            throw new NotFoundException('Address not found.');
        }

        const currentScheduleAt = await this.prisma.schedule.findFirst({
            where: {
                scheduleAt,
            },
        });

        if (currentScheduleAt) {
            throw new BadRequestException('Schedule already choosen.');
        }

        const schedule = await this.prisma.schedule.create({
            data: {
                timeOptionId,
                billingAddressId,
                paymentSituationId: isValidNumber(paymentSituationId),
                scheduleAt,
                total: isValidNumber(total),
                installments: isValidNumber(installments),
                personId: isValidNumber(personId),
            },
        });

        if (schedule) {
            services.split(',').forEach(async (item) => {
                await this.prisma.scheduleService.create({
                    data: {
                        scheduleId: schedule.id,
                        serviceId: +item,
                    },
                });
            });
        }

        this.socket.created(schedule);

        return schedule;
    }

    async remove(id: number, personId: number) {
        await this.isValidPerson(id, personId);

        return this.prisma.schedule.delete({
            where: {
                id: isValidNumber(id),
            },
        });
    }
}
