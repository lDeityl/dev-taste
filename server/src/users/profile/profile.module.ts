import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { S3Module } from 's3/s3.module';

@Module({
    imports: [S3Module],
    controllers: [ProfileController]
})
export class ProfileModule { }
