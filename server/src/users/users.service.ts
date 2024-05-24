import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ) {

    }

    async findOneEmail(email: string): Promise<Users | undefined> {
        const user = await this.prisma.users.findUnique({
            where: {
                email
            }
        })
        return user;
    }

    async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
        await this.prisma.users.update({
            where: {
                id: userId
            },
            data: {
                twoFactorAuthenticationSecret: secret
            }
        })
    }

    async turnOnTwoFactorAuthentication(userId: number) {
        await this.prisma.users.update({
            where: {
                id: userId
            },
            data: {
                isTwoFactorAuthenticationEnabled: true
            }
        })
    }

    async setCodeConfirmation(email: string, code: string) {
        await this.prisma.users.update({
            where: {
                email: email
            },
            data: {
                code_confirmation_email: code
            }
        })
    }

    async checkCodeConfirmation(email: string, code: string) {
        const foundUser = await this.prisma.users.findFirst({
            where: {
                email: email,
                code_confirmation_email: code
            }
        })

        if (!foundUser) throw new BadRequestException('Wrong code');

        await this.prisma.users.update({
            where: {
                id: foundUser.id
            },
            data: {
                isEmailActivated: true,
                code_confirmation_email: null
            }
        })

        return true;
    }

    async turnOffTwoFactorAuthentication(userId: number) {
        await this.prisma.users.update({
            where: {
                id: userId
            },
            data: {
                isTwoFactorAuthenticationEnabled: false
            }
        })
    }
}