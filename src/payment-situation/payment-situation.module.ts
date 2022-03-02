import { Module } from '@nestjs/common';
import { PaymentSituationService } from './payment-situation.service';
import { PaymentSituationController } from './payment-situation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: Number(process.env.JWT_EXPIRE),
                },
            }),
        }),
        AuthModule,
        UserModule,
        PrismaModule,
    ],
    controllers: [PaymentSituationController],
    providers: [PaymentSituationService],
})
export class PaymentSituationModule {}
