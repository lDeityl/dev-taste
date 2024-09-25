import { BadRequestException, Body, Controller, Get, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateAddress, UpdateProfile, UpdateProfileImage } from './profile.dto';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 's3/s3.service';
import { RolesGuard } from 'roles/roles.guard';
import { Jwt2faAuthGuard } from 'auth/jwt-2fa-auth.guard';

const imageFileFilter = (req: any, file: Express.Multer.File, callback: Function) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|svg+xml|webp|avif)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(private prisma: PrismaService, private s3: S3Service) { }

    @UseGuards(Jwt2faAuthGuard)
    @Post('update-date')
    async updateContact(@Req() req, @Body() body: UpdateProfile) {

        return await this.prisma.users.update({
            where: { id: Number(req.user.id) },
            data: {
                name: String(body.name),
                email: String(body.email),
                phone: String(body.phone),
            },
        });
    }

    @UseGuards(Jwt2faAuthGuard)
    @Post('update-image')
    @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
    async updateImageProfile(@Req() req, @Body() body: UpdateProfileImage, @UploadedFile() file: Express.Multer.File) {

        if (!file && !body.imgURL) {
            throw new BadRequestException('Wrong image');
        }

        let link = body.imgURL;

        if (file) {
            link = await this.s3.uploadFile(file);
        }

        return await this.prisma.users.update({
            where: { id: Number(req.user.id) },
            data: {
                imgURL: link,
            },
        });
    }


    @UseGuards(Jwt2faAuthGuard)
    @Post('update-address')
    async updateAddress(@Req() req, @Body() body: UpdateAddress) {

        return await this.prisma.address.upsert({
            where: {
                id: Number(body.id) || -1,
            },
            create: {
                city: String(body.city),
                street: String(body.street),
                house: String(body.house),
                apartment: String(body.apartment),
                floor: String(body.floor),
                entrance: String(body.entrance),
                usersId: Number(req.user.id)
            },
            update: {
                city: String(body.city),
                street: String(body.street),
                house: String(body.house),
                apartment: String(body.apartment),
                floor: String(body.floor),
                entrance: String(body.entrance),
                usersId: Number(req.user.id)
            },
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-address')
    async getUserAddress(@Query('userId') userId?: string) {
        return this.prisma.address.findFirst({
            where: {
                usersId: Number(userId)
            }
        });
    }
}
