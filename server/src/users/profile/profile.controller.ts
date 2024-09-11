import { BadRequestException, Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateProfile } from './profile.dto';
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

    @UseGuards(Jwt2faAuthGuard, RolesGuard)
    @Post('update-date')
    @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
    async updateContact(@Req() req, @Body() body: UpdateProfile, @UploadedFile() file: Express.Multer.File) {

        if (!file && !body.imgURL) {
            throw new BadRequestException('Wrong image');
        }

        let link = body.imgURL;

        if (file) {
            link = await this.s3.uploadFile(file);
        }

        return await this.prisma.users.update({
            where: { id: Number(body.id) || -1 },
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                imgURL: link,
            },
        });
    }
}
