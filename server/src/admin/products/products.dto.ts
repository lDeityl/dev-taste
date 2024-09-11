import { IsNotEmpty, IsString, IsNumber, IsInt, IsBoolean, IsOptional } from "class-validator";

export class CreateProductDto {
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    squirrels: number;

    @IsNotEmpty()
    fats: number;

    @IsNotEmpty()
    carbohydrates: number;

    @IsNotEmpty()
    calories: number;

    @IsOptional()
    imageUrl: string;

    @IsNotEmpty()
    weight: number;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    isActive: boolean;
}

export class DeleteProducts {
    id: number;
}
