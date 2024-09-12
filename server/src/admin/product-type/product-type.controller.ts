import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { PrismaService } from 'prisma/prisma.service';
import { DeleteProductType, UpsertProductType } from './product-type.dto';

@Controller('product-type')
export class ProductTypeController {
    constructor(private prisma: PrismaService) { }

    @UseGuards(JwtAuthGuard)
    @Post('upsert')
    async createProduct(@Body() body: UpsertProductType) {
        return await this.prisma.productType.upsert({
            where: {
                id: body.id ?? -1
            },
            create: {
                name: body.name,
            },
            update: {
                name: body.name,
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
