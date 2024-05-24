import { Module } from '@nestjs/common';
import { PassRecoveryController } from './pass-recovery.controller';
import { PassRecoveryService } from './pass-recovery.service';

@Module({
    controllers: [PassRecoveryController],
    providers: [PassRecoveryService],
    exports: [PassRecoveryService],
})
export class PassRecoveryModule { }
