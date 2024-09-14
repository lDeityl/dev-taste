import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { PrismaService } from 'prisma/prisma.service';
import { DeleteProductType, UpsertProductType } from './product-type.dto';

@Controller('product-type')
export class ProductTypeController {
    constructor(private prisma: PrismaService) { }

    @UseGuards(JwtAuthGuard)
    @Get('get')
    async getCategories() {
        return await this.prisma.productType.findMany({});
    }

    @UseGuards(JwtAuthGuard)
    @Post('upsert')
    async createProduct(@Body() body: UpsertProductType) {
        return await this.prisma.productType.upsert({
            where: {
                id: Number(body.id) || -1
            },
            create: {
                name: String(body.name),
            },
            update: {
                name: String(body.name),
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteProduct(@Body() body: DeleteProductType) {
        return await this.prisma.productType.delete({
            where: {
                id: body.id
            },
        });
    }
}
