import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { PrismaErrorFilter } from 'filters';

async function bootstrap() {
  let settings = {
    cors: true,
  };

  const app = await NestFactory.create(AppModule, settings);
  const config = new DocumentBuilder().addBearerAuth().build();
  app.useGlobalFilters(new PrismaErrorFilter());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  await app.listen(3000);
}
bootstrap();
