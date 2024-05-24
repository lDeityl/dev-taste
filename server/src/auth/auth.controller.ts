import { Body, Controller, Post, UseGuards, UsePipes, Request, BadRequestException } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { SignUpDto } from './zod/signup';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { confirmationCodeDto } from './zod/signup';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(
        private prisma: PrismaService,
        private authService: AuthService
    ) {

    }
    @UsePipes(ZodValidationPipe)
    @Post('signup')
    async signUp(@Body() signUpParams: SignUpDto) {
        const { email, name, password } = signUpParams;
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);

        let user;

        try {
            user = await this.prisma.users.create({
                data: {
                    email,
                    name,
                    password: hashedPassword
                }
            })
        } catch (err) {
            const { code } = err;
            if (code === "P2002") {
                throw new BadRequestException('User already exists');
            }
        }

        return this.authService.login(user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Throttle(1, 60)
    @UseGuards(JwtAuthGuard)
    @Post('send-confirmation')
    async sendConfirmation(@Request() req) {
        return await this.authService.sendConfirmation(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ZodValidationPipe)
    @Post('confirm-email')
    async confirmEmail(@Request() req, @Body() body: confirmationCodeDto) {
        return await this.authService.confirmEmail(req.user, body.code);
    }
}
