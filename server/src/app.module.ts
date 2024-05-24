import { MiddlewareConsumer, Module, NestModule, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassRecoveryModule } from './pass-recovery/pass-recovery.module';
import { TwoFactorModule } from './two-factor/two-factor.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, PassRecoveryModule, TwoFactorModule, ThrottlerModule.forRoot({
    ttl: 60,
    limit: 10,
  }), CacheModule.register()],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
