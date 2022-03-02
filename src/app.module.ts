import { PaymentModule } from './payment/payment.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AddressModule } from './address/address.module';
import { TimeOptionModule } from './time-option/time-option.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './service/service.module';
import { PaymentSituationModule } from './payment-situation/payment-situation.module';

@Module({
    imports: [
        PaymentModule,
        AddressModule,
        TimeOptionModule,
        MailModule,
        AuthModule,
        UserModule,
        PrismaModule,
        ServiceModule,
        PaymentSituationModule,
        ScheduleModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
