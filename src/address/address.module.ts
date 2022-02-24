import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

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
        PrismaModule,        
        UserModule,
        AuthModule,
    ],
    controllers: [
        AddressController,
    ],
    providers: [
        AddressService,        
    ],
})
export class AddressModule { }
