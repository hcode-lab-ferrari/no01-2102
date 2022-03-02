import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAddressDto {
    @IsNotEmpty({
        message: 'A rua é obrigatória.',
    })
    @IsString()
    street: string;

    number: string;

    complement: string;

    @IsNotEmpty()
    @IsString()
    district: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(8)
    zipcode: string;
}
