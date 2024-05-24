import { Controller, Get, Request, Post, UseGuards, Body, UsePipes, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { Jwt2faAuthGuard } from 'auth/jwt-2fa-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService,
    private prisma: PrismaService) { }

  @Get('/')
  async Hello() {
    return 'API created by CircuitBlaze Team'
  }

  @UseGuards(Jwt2faAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}