// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

interface FindAllOptions {
    search: string;
    categoryId?: number;
    sort: 'increase' | 'descrease';
    limit: number;
}

@Injectable()
export class CatalogService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll({ search, categoryId, sort, limit }: FindAllOptions) {
        const where: any = {
            name: { contains: search, mode: 'insensitive' },
        };

        if (categoryId) {
            where.categoryId = categoryId;
        }

        let orderBy: any;

        switch (sort) {
            case 'increase':
                orderBy = { price: 'asc' };
                break;
            case 'descrease':
                orderBy = { price: 'desc' };
                break;
        }

        const catalog = await this.prisma.product.findMany({
            where,
            orderBy,
            include: {
                Category: true,
                ProductType: true,
            },
            take: Number(limit),
        });

        const totalItems = await this.prisma.product.count({ where });

        return {
            catalog,
            totalItems,
        };
    }
}
