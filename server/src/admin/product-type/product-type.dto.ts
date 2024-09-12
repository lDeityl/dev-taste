import { IsNotEmpty } from "class-validator";

export class UpsertProductType {
    id: number;

    @IsNotEmpty()
    name: string

}

export class DeleteProductType {
    id: number;
}
