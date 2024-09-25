import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { PrismaService } from 'prisma/prisma.service';
import { RolesGuard } from 'roles/roles.guard';

@Controller('admin')
export class AdminController {
    constructor(private prisma: PrismaService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('get-admin-by-id')
    async getAdminById(@Req() req) {
        const userId = req.user.id;
        return this.prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                email: true,
                name: true,
                imgURL: true
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-users')
    async getUsersAdmin() {
        return this.prisma.users.findMany({
            select: {
                email: true,
                name: true,
                role: true,
                id: true,
                createdAt: true
            }
        });
    }

}
