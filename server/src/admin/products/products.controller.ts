import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './products.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productService: ProductService,
        private prisma: PrismaService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                callback(null, `${uniqueSuffix}${ext}`);
            },
        }),
    }))
    async createProduct(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        const createProductDto: CreateProductDto = {
            ...body,
            price: parseInt(body.price, 10),
            squirrels: parseInt(body.squirrels, 10),
            fats: parseInt(body.fats, 10),
            carbohydrates: parseInt(body.carbohydrates, 10),
            calories: parseInt(body.calories, 10),
            weight: parseInt(body.weight, 10),
            categoryId: parseInt(body.categoryId, 10),
            isActive: body.isActive === 'true',
            isFavourite: body.isFavourite === 'true',
            imageUrl: `/uploads/${file.filename}`,
        };

        return this.productService.createProduct(createProductDto);
    }


}
