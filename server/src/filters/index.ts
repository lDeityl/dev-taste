import { Catch, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorFilter {
    catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = this.getStatus(error.code);

        response.status(status).json({
            statusCode: status,
            message: error.code,
            error: error.name,
        });
    }

    private getStatus(code: string): number {
        switch (code) {
            case 'P2002':
                return 400;
            case 'P2016':
                return 404;
            default:
                return 500;
        }
    }
}