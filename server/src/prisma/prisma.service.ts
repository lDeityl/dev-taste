import { PrismaClient } from '@prisma/client';
import {
    Injectable,
    INestApplication,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';


@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        });
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
