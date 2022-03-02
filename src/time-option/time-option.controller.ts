import { Body, Controller, Get, Post } from '@nestjs/common';
import { TimeOptionService } from './time-option.service';

@Controller('time-options')
export class TimeOptionController {
    constructor(private timeOptionService: TimeOptionService) {}

    @Get()
    async getTimeOptions() {
        return this.timeOptionService.listTimeOptions();
    }

    @Post()
    async create(@Body('day') day, @Body('time') time) {
        return this.timeOptionService.createTimeOption({
            day,
            time,
        });
    }
}
