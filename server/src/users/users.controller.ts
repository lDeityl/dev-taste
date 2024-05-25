import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "auth/jwt-auth.guard";
import { PrismaService } from "prisma/prisma.service";

@Controller('users')
export class UsersController {
    constructor(private prisma: PrismaService) { }

    @Get('all-users')
    async getAllUsers() {
        return this.prisma.users.findMany();
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-user-by-id')
    async getUserById(@Req() req) {
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
