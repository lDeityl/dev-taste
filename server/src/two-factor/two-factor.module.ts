import { Module } from '@nestjs/common';
import { TwoFactorController } from './two-factor.controller';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';
import { TwoFactorService } from './two-factor.service';


@Module({
    imports: [UsersModule, AuthModule],
    controllers: [TwoFactorController],
    providers: [TwoFactorService],
})
export class TwoFactorModule { }
