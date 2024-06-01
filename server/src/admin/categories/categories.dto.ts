import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator"

export class CreateCategories {

    @IsNotEmpty()
    name: string

    categoryType: CategoryType;

    @IsBoolean()
    isActive: boolean
}

enum CategoryType {
    COLD_APPETIZERS = 'COLD_APPETIZERS',
    HOT_APPETIZERS = 'HOT_APPETIZERS',
    MEAT_DISHES = 'MEAT_DISHES',
}