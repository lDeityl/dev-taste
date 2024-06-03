import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto, DeleteProducts } from './products.dto';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { id } from 'ethers/lib/utils';

@Controller('products')
export class ProductsController {
    constructor(private prisma: PrismaService) { }

    @Get('get')
    async getProducts() {
        return await this.prisma.product.findMany({
            orderBy: {
                id: "asc",
            },
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createProduct(@Body() body: CreateProductDto) {

        const categoryId = typeof body.categoryId === 'number' ? body.categoryId : -1;

        const category = await this.prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!category) {
            throw new Error(`Category with id ${categoryId} not found`);
        }

        const product = await this.prisma.product.upsert({
            where: {
                id: body.id ?? -1
            },
            create: {
                name: body.name,
                description: body.description,
                price: body.price,
                squirrels: body.squirrels,
                fats: body.fats,
                carbohydrates: body.carbohydrates,
                calories: body.calories,
                weight: body.weight,
                categoryId: category.id,
                isActive: body.isActive,
                imageUrl: body.imageUrl || 'imageUrl'
            },
            update: {
                name: body.name,
                description: body.description,
                price: body.price,
                squirrels: body.squirrels,
                fats: body.fats,
                carbohydrates: body.carbohydrates,
                calories: body.calories,
                weight: body.weight,
                categoryId: category.id,
                isActive: body.isActive,
                imageUrl: body.imageUrl || 'imageUrl'
            }
        });
        return product;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteProduct(@Body() body: DeleteProducts) {
        return await this.prisma.product.delete({
            where: {
                id: body.id
            },
        });
    }

}
