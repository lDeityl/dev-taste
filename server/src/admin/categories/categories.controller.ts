import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategories } from './categories.dto';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
    constructor(
        private prisma: PrismaService) { }


    @Get('get')
    async getCategories() {
        return await this.prisma.category.findMany()
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createProduct(@Body() body: CreateCategories) {

        const categories = await this.prisma.category.create({
            data: {
                name: body.name,
                categoryType: body.categoryType,
                isActive: body.isActive
            }
        })

        return categories;
    }
}
