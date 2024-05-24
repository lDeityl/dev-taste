import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'entities/role.enum';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'prisma/prisma.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])

    if (!requireRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    return requireRoles.includes(user.role);
  }
}
