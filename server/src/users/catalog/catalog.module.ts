import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
    providers: [CatalogService],
    controllers: [CatalogController]
})
export class CatalogModule { }
