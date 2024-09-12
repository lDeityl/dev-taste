import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { S3Module } from 's3/s3.module';

@Module({
    controllers: [CategoriesController],
    imports: [S3Module]
})
export class CategoriesModule { }
