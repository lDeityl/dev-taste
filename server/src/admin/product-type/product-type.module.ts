import { Module } from '@nestjs/common';
import { ProductTypeController } from './product-type.controller';
import { S3Module } from 's3/s3.module';

@Module({
    controllers: [ProductTypeController],
})
export class ProductTypeModule { }
