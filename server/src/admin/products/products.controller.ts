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
import { Role } from 'entities/role.enum';
import { Roles } from 'roles/roles.decorator';
import { RolesGuard } from 'roles/roles.guard';

const imageFileFilter = (req: any, file: Express.Multer.File, callback: Function) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|svg+xml|webp|avif)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};

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
            include: {
                Category: true
            }
        });
    }

    @UseGuards(Jwt2faAuthGuard, RolesGuard)
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

        // Преобразование данных

        const categoryId = Number(body.categoryId);
        const price = Number(body.price);
        const squirrels = Number(body.squirrels);
        const fats = Number(body.fats);
        const carbohydrates = Number(body.carbohydrates);
        const calories = Number(body.calories);
        const weight = Number(body.weight);
        const isActive = body.isActive === true;

        // Проверка на валидность преобразованных данных
        if (isNaN(price) || isNaN(squirrels) || isNaN(fats) || isNaN(carbohydrates) || isNaN(calories) || isNaN(weight)) {
            throw new BadRequestException('Invalid numeric value');
        }

        const category = await this.prisma.category.findUnique({
            where: { id: categoryId }
        });

        let data = {
            name: body.name,
            description: body.description,
            price,
            squirrels,
            fats,
            carbohydrates,
            calories,
            weight,
            categoryId: category.id,
            isActive,
            imageUrl: link
        }

        await this.prisma.product.upsert({
            where: {
                id: Number(body.id) || -1,
            },
            create: data,
            update: data
        });

        return;
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
