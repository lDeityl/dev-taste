import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { S3Module } from 's3/s3.module';

@Module({
    imports: [ProductsModule, CategoriesModule, S3Module],
    controllers: [AdminController],
})
export class AdminModule { }
