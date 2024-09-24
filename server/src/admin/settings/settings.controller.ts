import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { PrismaService } from 'prisma/prisma.service';
import { CreateSettingsDto } from './settings.dto';

@Controller('settings')
export class SettingsController {
    constructor(private prisma: PrismaService) { }

    @Get('get')
    async getAdminById() {
        return this.prisma.mainSettings.findFirst({});
    }

    @Post('update-settings')
    async updateSettings(@Body() body: CreateSettingsDto) {

        return await this.prisma.mainSettings.upsert({
            where: {
                id: Number(body.id) || -1,
            },
            create: {
                contactsPhone: body.contactsPhone,
                delivery_schedule: body.delivery_schedule,
                cafe_opening_hours: body.cafe_opening_hours,
                address: body.address,
                email: body.email,
                about_title: body.about_title,
                about_description: body.about_description,
            },
            update: {
                contactsPhone: body.contactsPhone,
                delivery_schedule: body.delivery_schedule,
                cafe_opening_hours: body.cafe_opening_hours,
                address: body.address,
                email: body.email,
                about_title: body.about_title,
                about_description: body.about_description,
            }
        })
    }
}
