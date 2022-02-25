import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller("schedules")
export class ScheduleController {

    constructor(private scheduleService: ScheduleService) {}

    @Get()
    async list() {

    }

    @UseGuards(AuthGuard)
    @Post()
    async createSchedule(
        @Body() data: CreateScheduleDto,
        @User() user,
    ) {
        return this.scheduleService.create(user.personId, data);
    }

}
