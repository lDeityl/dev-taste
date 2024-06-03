import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PrismaService } from 'prisma/prisma.service';
import { S3Module } from 's3/s3.module';

@Module({
    imports: [S3Module],
    controllers: [ProductsController],
    providers: [PrismaService],
})
export class ProductsModule { }
