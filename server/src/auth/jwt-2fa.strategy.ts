import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, 'jwt-2fa') {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findOneEmail(payload.email);

        // if (!user.isEmailActivated) {
        //     throw new BadRequestException('Email not activated');
        // }

        if (!user.isTwoFactorAuthenticationEnabled) {
            return user;
        }

        if (payload.isTwoFactorAuthenticated) {
            return user;
        }
    }
}
