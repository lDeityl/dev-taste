import { BadRequestException, Body, Controller, Get, HttpCode, Post, Req, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { UsersService } from 'users/users.service';
import { TwoFactorService } from './two-factor.service';
import { twoFactorCodeDto } from './zod';
import { ZodValidationPipe } from 'nestjs-zod';
import { Jwt2faAuthGuard } from 'auth/jwt-2fa-auth.guard';

@Controller('2fa')
export class TwoFactorController {
    constructor(
        private usersService: UsersService,
        private twoFactorService: TwoFactorService,
        private authService: AuthService
    ) {

    }

    @Post('turn-on')
    @UsePipes(ZodValidationPipe)
    @UseGuards(Jwt2faAuthGuard)
    async turnOnTwoFactorAuthentication(@Req() request, @Body() body: twoFactorCodeDto) {
        const isCodeValid =
            this.twoFactorService.isTwoFactorAuthenticationCodeValid(
                body.twoFactorAuthenticationCode,
                request.user,
            );
        if (!isCodeValid) {
            throw new BadRequestException('Wrong authentication code');
        }
        await this.usersService.turnOnTwoFactorAuthentication(request.user.id);
        return this.authService.loginWith2fa(request.user);
    }

    @Post('authenticate')
    @HttpCode(200)
    @UsePipes(ZodValidationPipe)
    @UseGuards(JwtAuthGuard)
    async authenticate(@Req() request, @Body() body: twoFactorCodeDto) {
        const isCodeValid = this.twoFactorService.isTwoFactorAuthenticationCodeValid(
            body.twoFactorAuthenticationCode,
            request.user,
        );

        if (!isCodeValid) {
            throw new BadRequestException('Wrong authentication code');
        }

        return this.authService.loginWith2fa(request.user);
    }

    @Post('generate')
    @HttpCode(200)
    @UseGuards(Jwt2faAuthGuard)
    async generate(@Req() request) {
        if (request.user.isTwoFactorAuthenticationEnabled) throw new BadRequestException('Two factor already enabled');
        return await this.twoFactorService.generateTwoFactorAuthenticationSecret(request.user)
    }


    @Post('turn-off')
    @UsePipes(ZodValidationPipe)
    @UseGuards(Jwt2faAuthGuard)
    async turnoffTwoFactorAuthentication(@Req() request, @Body() body: twoFactorCodeDto) {
        const isCodeValid =
            this.twoFactorService.isTwoFactorAuthenticationCodeValid(
                body.twoFactorAuthenticationCode,
                request.user,
            );
        if (!isCodeValid) {
            throw new BadRequestException('Wrong authentication code');
        }
        await this.usersService.turnOffTwoFactorAuthentication(request.user.id);
        return this.authService.login(request.user);
    }
}
