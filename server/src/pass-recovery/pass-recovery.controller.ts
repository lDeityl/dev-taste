import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PassRecoveryService } from './pass-recovery.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { EmailDto } from './zod';
import { VerifyRecoverDto, ChangePasswordDto } from './zod';
import { Throttle } from '@nestjs/throttler';

@Controller('pass-recovery')
export class PassRecoveryController {
  constructor(
    private passRecoveryService: PassRecoveryService
  ) {

  }

  @Throttle(1, 60)
  @UsePipes(ZodValidationPipe)
  @Post('/send-recovery-email')
  async recoverPassword(@Body() passRecoverDto: EmailDto) {
    return this.passRecoveryService.sendRecoverEmail(passRecoverDto.email);
  }

  @UsePipes(ZodValidationPipe)
  @Post('/verify-recovery')
  async verifyRecoverPassword(
    @Body() verifyRecoverPasswordDto: VerifyRecoverDto,
  ) {
    return this.passRecoveryService.verifyRecoverEmail(
      verifyRecoverPasswordDto,
    );
  }

  @UsePipes(ZodValidationPipe)
  @Post('/change')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.passRecoveryService.changePassword(changePasswordDto);
  }
}
