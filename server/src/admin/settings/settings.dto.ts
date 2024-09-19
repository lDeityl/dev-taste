import { IsNotEmpty, IsString, IsNumber, IsInt, IsBoolean, IsOptional } from "class-validator";

export class CreateSettingsDto {
    id: number;

    @IsNotEmpty()
    contactsPhone: string;

    @IsNotEmpty()
    delivery_schedule: string;

    @IsNotEmpty()
    cafe_opening_hours: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    about_title: string;

    @IsNotEmpty()
    about_description: string;

}