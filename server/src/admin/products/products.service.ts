import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './products.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async createProduct(data: CreateProductDto) {
        return this.prisma.product.create({
            data,
        });
    }
}
