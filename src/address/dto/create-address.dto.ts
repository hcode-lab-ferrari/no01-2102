import { IsEmpty, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty({
        message: "A rua é obrigatória.",
    })
    @IsString()
    street: string;
    
    @IsEmpty()
    number: string;
    
    @IsEmpty()
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