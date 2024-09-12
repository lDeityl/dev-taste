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

export class UpdateProfileImage {
    id: number

    @IsOptional()
    imgURL: string
}