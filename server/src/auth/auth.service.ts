import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { sendEmail } from 'utils/sendEmail';
import { randomIntFromInterval } from 'utils';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneEmail(email);

        if (!user) {
            throw new BadRequestException('User with this email not found');
        }

        const passwordValid = await bcrypt.compare(pass, user.password)
        if (user && passwordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user) {
        const payload = {
            email: user.email,
            isTwoFactorAuthenticationEnabled: user.isTwoFactorAuthenticationEnabled,
            isEmailActivated: user.isEmailActivated,
            role: user.role
        };

        return {
            email: payload.email,
            isTwoFactorAuthenticationEnabled: payload.isTwoFactorAuthenticationEnabled,
            isEmailActivated: payload.isEmailActivated,
            access_token: this.jwtService.sign(payload),
            role: payload.role
        };
    }

    async loginWith2fa(userWithoutPsw) {
        const payload = {
            email: userWithoutPsw.email,
            isTwoFactorAuthenticationEnabled: !!userWithoutPsw.isTwoFactorAuthenticationEnabled,
            isTwoFactorAuthenticated: true,
            role: userWithoutPsw.role,
            isEmailActivated: userWithoutPsw.isEmailActivated,
        };

        return {
            email: payload.email,
            isTwoFactorAuthenticationEnabled: payload.isTwoFactorAuthenticationEnabled,
            isEmailActivated: payload.isEmailActivated,
            access_token: this.jwtService.sign(payload),
            role: payload.role
        };
    }

    async sendConfirmation(user) {
        const int = randomIntFromInterval(100000, 999999);

        const generatedInt = `${int}`;

        await sendEmail(user.email, generatedInt, 'Подтверждение email');

        await this.usersService.setCodeConfirmation(user.email, generatedInt);

        return true;
    }

    async confirmEmail(user, code) {
        return await this.usersService.checkCodeConfirmation(user.email, code);
    }
}