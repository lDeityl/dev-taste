import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { PrismaService } from 'prisma/prisma.service';

@Controller('admin')
export class AdminController {
    constructor(private prisma: PrismaService) { }

    @UseGuards(JwtAuthGuard)
    @Get('get-admin-by-id')
    async getAdminById(@Req() req) {
        const userId = req.user.id;
        return this.prisma.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                email: true,
                name: true
            }
        });
    }

}
