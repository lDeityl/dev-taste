import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { sendEmail } from 'utils/sendEmail';
import { VerifyRecoverDto, ChangePasswordDto } from './zod';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { randomIntFromInterval } from 'utils';

@Injectable()
export class PassRecoveryService {
  constructor(
    private prisma: PrismaService
  ) { }



  async sendRecoverEmail(email: string) {
    const int = randomIntFromInterval(100000, 999999);

    const findUser = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      throw new BadRequestException('Not found email');
    }

    await this.prisma.users.update({
      where: {
        email: email,
      },
      data: {
        code_change_password: int,
      },
    });

    await sendEmail(email, `${int}`, 'Password recovery')
    return true;
  }

  async verifyRecoverEmail(VerifyRecoverPasswordDto: VerifyRecoverDto) {

    const { code, email } = VerifyRecoverPasswordDto;

    const { code_change_password } = await this.prisma.users.findFirst({
      where: {
        email: VerifyRecoverPasswordDto.email,
      },
    });

    if (Number(code) === code_change_password) {
      const token = jwt.sign(
        { email },
        process.env.SECRET_KEY_FOR_ENCRYPTION,
        {
          expiresIn: `${30 * 60}s`,
        },
      );
      return token;
    }

    throw new BadRequestException('Wrong code');

  }

  async changePassword(ChangePasswordDto: ChangePasswordDto) {

    let payload;

    try {
      payload = jwt.verify(
        ChangePasswordDto.token,
        process.env.SECRET_KEY_FOR_ENCRYPTION,
      );
    } catch (err) {
      throw new BadRequestException('Incorrect token');
    }


    const findUser = await this.prisma.users.findFirst({
      where: {
        email: payload.email
      },
    });

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(ChangePasswordDto.password, saltOrRounds);

    const passwordValid = await bcrypt.compare(ChangePasswordDto.password, findUser.password)

    if (!passwordValid) {
      await this.prisma.users.update({
        where: {
          email: payload.email,
        },
        data: {
          password: hashedPassword,
          code_change_password: null
        },
      });

      return true;
    }

    throw new BadRequestException('Same password');

  }
}
