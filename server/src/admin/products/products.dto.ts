export class CreateProductDto {
    name: string;
    description: string;
    price: number;
    squirrels: number;
    fats: number;
    carbohydrates: number;
    calories: number;
    weight: number;
    categoryId: number;
    isActive: boolean;
    isFavourite?: boolean;
    imageUrl: string;
}
