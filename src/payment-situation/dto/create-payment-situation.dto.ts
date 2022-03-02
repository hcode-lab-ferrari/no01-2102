import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentSituationDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
