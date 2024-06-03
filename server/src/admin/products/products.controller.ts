import { BadRequestException, Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto, DeleteProducts } from './products.dto';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { id } from 'ethers/lib/utils';
import { S3Service } from 's3/s3.service';
import { Jwt2faAuthGuard } from 'auth/jwt-2fa-auth.guard';

const imageFileFilter = (req: any, file: Express.Multer.File, callback: Function) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|svg+xml|webp|avif)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
    constructor(private prisma: PrismaService,
        private s3: S3Service) { }

    @Get('get')
    async getProducts() {
        return await this.prisma.product.findMany({
            orderBy: {
                id: "asc",
            },
        });
    }

    @UseGuards(Jwt2faAuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
    async createProduct(@Body() body: CreateProductDto, @UploadedFile() file: Express.Multer.File) {

        if (!file && !body.imageUrl) {
            throw new BadRequestException('Wrong image');
        }

        let link = body.imageUrl;

        if (file) {
            link = await this.s3.uploadFile(file);
        }

        const categoryId = typeof body.categoryId === 'number' ? body.categoryId : -1;

        const category = await this.prisma.category.findUnique({
            where: { id: categoryId }
        });

        const product = await this.prisma.product.upsert({
            where: {
                id: Number(body.id) || -1
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
                imageUrl: link
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
                imageUrl: link
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
