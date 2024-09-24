import { IsNotEmpty, IsOptional } from "class-validator"

export class UpdateProfile {
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsOptional()
    phone?: string;
}

export class UpdateAddress {
    id: number;

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    street: string

    @IsNotEmpty()
    house: string

    @IsNotEmpty()
    apartment: string

    @IsNotEmpty()
    floor: string

    @IsNotEmpty()
    entrance: string
}

export class UpdateProfileImage {
    id: number

    @IsOptional()
    imgURL: string
}