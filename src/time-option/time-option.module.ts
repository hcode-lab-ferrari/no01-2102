import { TimeOptionService } from './time-option.service';
import { TimeOptionController } from './time-option.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TimeOptionController],
    providers: [TimeOptionService],
})
export class TimeOptionModule {}
