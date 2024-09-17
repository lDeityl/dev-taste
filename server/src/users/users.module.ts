import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProfileModule } from './profile/profile.module';
import { S3Module } from 's3/s3.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
    imports: [ProfileModule, S3Module, CatalogModule]
})
export class UsersModule { }