import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategories, DeleteCategories } from './categories.dto';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
    constructor(
        private prisma: PrismaService) { }


    @Get('get')
    async getCategories() {
        return await this.prisma.category.findMany({
            orderBy: {
                id: "asc",
            },
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createProduct(@Body() body: CreateCategories) {
        const categories = await this.prisma.category.upsert({
            where: {
                id: body.id ?? -1
            },
            create: {
                name: body.name,
                isActive: body.isActive
            },
            update: {
                name: body.name,
                isActive: body.isActive
            }
        });

        return categories;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteProduct(@Body() body: DeleteCategories) {
        return await this.prisma.category.delete({
            where: {
                id: body.id
            },
        });
    }
}
