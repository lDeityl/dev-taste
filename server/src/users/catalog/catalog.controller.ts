import { Controller, Get, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
    constructor(private prisma: PrismaService, private readonly catalogService: CatalogService) { }

    // @Get('get')
    // async getCatalog(
    //     @Query('limit') limit: string | number,
    //     @Query('search') search: string,
    // ) {
    //     const whereCondition: Prisma.ProductWhereInput = {
    //         name: {
    //             contains: search,
    //             mode: Prisma.QueryMode.insensitive,
    //         },
    //     };

    //     const limitValue = limit ? Number(limit) : 10;

    //     const catalog = await this.prisma.product.findMany({
    //         where: whereCondition,
    //         orderBy: {
    //             id: 'asc',
    //         },
    //         include: {
    //             Category: true
    //         },
    //         take: limitValue,
    //     });

    //     const totalItems = await this.prisma.product.count({
    //         where: whereCondition,
    //     });

    //     return {
    //         catalog,
    //         totalItems,
    //     };
    // }

    @Get('get')
    async getCatalog(
        @Query('pageParam') page: number = 1,
        @Query('limit') limit: string | number,
        @Query('search') search: string,
        @Query('categoryId') categoryId?: string,
        @Query('productTypeId') productTypeId?: string,
        @Query('sort') sort?: string,
    ) {

        const whereCondition: Prisma.ProductWhereInput = {
            name: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
            },
            ...(categoryId && { categoryId: Number(categoryId) }),
            ...(productTypeId && { productTypeId: Number(productTypeId) }),
        };

        // Устанавливаем сортировку по цене
        const orderByCondition: Prisma.ProductOrderByWithRelationInput = sort === 'increase'
            ? { price: 'asc' }   // По возрастанию цены
            : { price: 'desc' }; // По убыванию цены

        limit = Number(limit);
        const offset = (page - 1) * limit;

        const catalog = await this.prisma.product.findMany({
            where: whereCondition,
            orderBy: orderByCondition,
            include: {
                Category: true,
            },
            take: limit,
            skip: offset
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
