import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumberString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddressDto";

export class CreateCustomerDto {
    @IsNumberString()
    id: number;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @ValidateNested()
    @Type(() => CreateAddressDto)
    @IsNotEmptyObject()
    address: CreateAddressDto;
}