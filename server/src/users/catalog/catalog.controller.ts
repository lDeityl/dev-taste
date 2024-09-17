import { Controller, Get, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Controller('catalog')
export class CatalogController {
    constructor(private prisma: PrismaService) { }

    @Get('get')
    async getCatalog(
        @Query('limit') limit: string | number,
        @Query('search') search: string,
    ) {
        const whereCondition: Prisma.ProductWhereInput = {
            name: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
            },
        };

        const limitValue = limit ? Number(limit) : 10;

        const catalog = await this.prisma.product.findMany({
            where: whereCondition,
            orderBy: {
                id: 'asc',
            },
            take: limitValue,
        });

        const totalItems = await this.prisma.product.count({
            where: whereCondition,
        });

        return {
            catalog,
            totalItems,
        };
    }

}
