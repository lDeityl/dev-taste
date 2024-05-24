import { BadRequestException, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {

    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            forcePathStyle: false, // Configures to use subdomain/virtual calling format.
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION,
            credentials: {
                accessKeyId: process.env.SPACES_KEY,
                secretAccessKey: process.env.SPACES_SECRET
            }
        });
    }

    async uploadFile(file: Express.Multer.File) {
        const bucketName = process.env.SPACES_NAME

        const key = `${process.env.IMG_FOLDER}${Date.now()}`;

        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucketName,
            Key: key,
            ContentType: file.mimetype,
            ACL: 'public-read'
        }

        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input)
            )
            if (response.$metadata.httpStatusCode === 200) {
                return `${process.env.S3_BUKCET}/${key}`
            }
            throw new BadRequestException("Image not saved to s3!");
        } catch (err) {
            console.log(err)

            throw new BadRequestException("Error uploading");
        }
    }
}
