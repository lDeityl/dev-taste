import { IsNotEmpty, IsString, IsNumber, Min, IsInt, IsBoolean } from "class-validator";

export class CreateProductDto {
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    squirrels: number;

    @IsNotEmpty()
    @IsNumber()
    fats: number;

    @IsNotEmpty()
    @IsNumber()
    carbohydrates: number;

    @IsNotEmpty()
    @IsNumber()
    calories: number;

    @IsString()
    imageUrl: string;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNotEmpty()
    @IsInt()
    categoryId: number;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}

export class DeleteProducts {
    id: number;
}
