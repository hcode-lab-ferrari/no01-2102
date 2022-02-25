import { Injectable } from '@nestjs/common';
import { isValid } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validation-number';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {

    constructor(private prisma: PrismaService) {}

    async findAll() {

    }

    async create(personId: number, {
        timeOptionId,
        billingAddressId,
        paymentSituationId,
        scheduleAt,
        total,
        installments,
        services,
    }: CreateScheduleDto) {

        scheduleAt = new Date(scheduleAt);

        const schedule = await this.prisma.schedule.create({
            data: {
                timeOptionId: isValidNumber(timeOptionId),
                billingAddressId: isValidNumber(billingAddressId),
                paymentSituationId: isValidNumber(paymentSituationId),
                scheduleAt,
                total: isValidNumber(total),
                installments: isValidNumber(installments),
                personId: isValidNumber(personId),
            },
        });

        if (schedule) {

            services.split(",").forEach(async (item) => {

                await this.prisma.scheduleService.create({
                    data: {
                        scheduleId: schedule.id,
                        serviceId: +item,
                    },     
                });

            });

        }

        return schedule;

    }

}
