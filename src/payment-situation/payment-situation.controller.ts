import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { PaymentSituationService } from './payment-situation.service';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { UpdatePaymentSituationDto } from './dto/update-payment-situation.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('payment-situations')
export class PaymentSituationController {
    constructor(
        private readonly paymentSituationService: PaymentSituationService,
    ) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() data: CreatePaymentSituationDto) {
        return this.paymentSituationService.create(data);
    }

    @Get()
    findAll() {
        return this.paymentSituationService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.paymentSituationService.findOne(+id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePaymentSituationDto: UpdatePaymentSituationDto,
    ) {
        return this.paymentSituationService.update(
            +id,
            updatePaymentSituationDto,
        );
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.paymentSituationService.remove(+id);
    }
}
