import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { S3Module } from 's3/s3.module';
import { ProductTypeModule } from './product-type/product-type.module';

@Module({
    imports: [ProductsModule, CategoriesModule, S3Module, ProductTypeModule],
    controllers: [AdminController],
})
export class AdminModule { }
