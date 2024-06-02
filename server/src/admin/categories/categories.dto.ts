import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator"

export class CreateCategories {
    id: number;

    @IsNotEmpty()
    name: string

    @IsBoolean()
    isActive: boolean
}
export class DeleteCategories {
    id: number;
}
