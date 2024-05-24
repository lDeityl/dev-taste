import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib'
import { toDataURL } from 'qrcode'
import { UsersService } from 'users/users.service';

@Injectable()
export class TwoFactorService {
    constructor(
        private usersService: UsersService,
    ) {

    }


    async generateTwoFactorAuthenticationSecret(user) {
        const secret = authenticator.generateSecret();

        const otpauthUrl = authenticator.keyuri(user.email, 'non-equilibrium', secret);
        await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
        const image = await this.generateQrCodeDataURL(otpauthUrl);

        return {
            secret,
            image
        }
    }


    async generateQrCodeDataURL(otpAuthUrl: string) {
        return toDataURL(otpAuthUrl);
    }

    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: any) {
        return authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: user.twoFactorAuthenticationSecret,
        });
    }
}
