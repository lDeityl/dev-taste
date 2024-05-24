import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';

function isExpressMulterFiles(files: any): files is { [fieldname: string]: Express.Multer.File[] } {
  return typeof files === 'object' && files !== null && !Array.isArray(files) &&
    Object.values(files).every((value: any) => Array.isArray(value) && value.every((item: any) => 'fieldname' in item && 'originalname' in item && 'encoding' in item && 'mimetype' in item && 'buffer' in item && 'size' in item));
}

function isExpressMulterFile(file: any): file is Express.Multer.File {
  return typeof file === 'object' && file !== null && !Array.isArray(file) &&
    'fieldname' in file && 'originalname' in file && 'encoding' in file && 'mimetype' in file && 'buffer' in file && 'size' in file;
}

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File | Express.Multer.File[], Promise<Buffer | Buffer[]>> {

  async transform(files: Express.Multer.File | Express.Multer.File[]): Promise<Buffer | Buffer[]> {
    if (!files) return
    if (isExpressMulterFiles(files)) {
      const processedFiles = await Promise.all(
        Object.values(files).map((fileArray) => Promise.all(fileArray.map((file) => this.processFile(file))))
      );
      return processedFiles.flat(); // Flattening the array
    } else if (isExpressMulterFile(files)) {
      const processedFile = await this.processFile(files);
      return processedFile;
    } else {
      throw new BadRequestException('Invalid files');
    }
  }

  private async processFile(file: Express.Multer.File): Promise<Buffer> {
    if (!file) {
      throw new BadRequestException('Invalid file');
    }

    const processedFile = await sharp(file.buffer)
      .webp({ effort: 3 })
      .toBuffer();

    return processedFile;
  }
}
