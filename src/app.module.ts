import { AddressModule } from './address/address.module';
import { TimeOptionModule } from './time-option/time-option.module';
import { ContactModule } from './contact/contact.module';
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
    AddressModule,
    TimeOptionModule,
    ContactModule,
    MailModule,
    AuthModule,
    UserModule,
    PrismaModule,
    ServiceModule,
    PaymentSituationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
