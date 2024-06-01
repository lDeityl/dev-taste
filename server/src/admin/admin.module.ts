import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  controllers: [AdminController],
  imports: [ProductsModule, CategoriesModule]
})
export class AdminModule {}
