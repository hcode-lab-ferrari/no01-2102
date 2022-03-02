import { PaymentService } from './payment.service';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [PaymentService],
})
export class PaymentModule {}
