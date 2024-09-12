import { BadRequestException, Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategories, DeleteCategories } from './categories.dto';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 's3/s3.service';

const imageFileFilter = (req: any, file: Express.Multer.File, callback: Function) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|svg+xml|webp|avif)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};

@Controller('categories')
export class CategoriesController {
    constructor(
        private prisma: PrismaService, private s3: S3Service) { }

    @Get('get')
    async getCategories() {
        return await this.prisma.companies.findMany({
            orderBy: {
                id: "asc",
            },
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
    async createProduct(@Body() body: CreateCategories, @UploadedFile() file: Express.Multer.File) {

        if (!file && !body.imageUrl) {
            throw new BadRequestException('Wrong image');
        }

        let link = body.imageUrl;

        if (file) {
            link = await this.s3.uploadFile(file);
        }

        return await this.prisma.companies.upsert({
            where: {
                id: body.id ?? -1
            },
            create: {
                name: body.name,
                isActive: body.isActive,
                imageUrl: link
            },
            update: {
                name: body.name,
                isActive: body.isActive,
                imageUrl: link
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteProduct(@Body() body: DeleteCategories) {
        return await this.prisma.companies.delete({
            where: {
                id: body.id
            },
        });
    }
}
