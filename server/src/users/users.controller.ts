import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
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
                id: true,
                email: true,
                name: true,
                phone: true,
                imgURL: true
            }
        });
    }

    @Get('get-product')
    async getProducts(@Query('productId') productId: string) {
        return await this.prisma.product.findFirst({
            where: {
                id: Number(productId),
                isActive: true
            },
            include: {
                ProductType: true,
                Category: true
            }
        });
    }

    @Get('get-categories')
    async getCategories() {

        return await this.prisma.companies.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                id: "asc",
            },
            include: {
                Product: {
                    where: {
                        isActive: true
                    },
                },
            },
        });
    }
}
