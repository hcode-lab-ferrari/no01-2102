import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimeOptionService {
    constructor(private prisma: PrismaService) {}

    async listTimeOptions() {
        return this.prisma.timeOption.findMany();
    }

    async createTimeOption({ day, time }: { day: number; time: string }) {
        day = Number(day);

        if (day < 0 || day > 6 || isNaN(day)) {
            throw new BadRequestException('Day is required.');
        }

        if (!time) {
            throw new BadRequestException('Time is required.');
        }

        const splittedTime = time.split(':');

        if (splittedTime.length !== 2) {
            throw new BadRequestException('Invalid time.');
        }

        const hours = Number(splittedTime[0]);
        const minutes = Number(splittedTime[1]);

        if (hours < 0 || hours > 23 || isNaN(hours)) {
            throw new BadRequestException('Invalid time.');
        }

        if (minutes < 0 || minutes > 59 || isNaN(minutes)) {
            throw new BadRequestException('Invalid time.');
        }

        const timeDate = new Date();

        timeDate.setHours(hours, minutes, 0);

        return this.prisma.timeOption.create({
            data: {
                day,
                time: timeDate,
            },
        });
    }
}
