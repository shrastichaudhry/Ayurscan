import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';

import {
  AppLoggerService,
} from './common/logger/app-logger.service';

import {
  HttpLoggingInterceptor,
} from './common/interceptors/http-logging.interceptor';

async function bootstrap() {
  // Application Logger
  const logger =
    new AppLoggerService();

  // Create NestJS application ONLY ONCE
  const app =
    await NestFactory.create(
      AppModule,
      {
        logger,
      },
    );

  // Global API Prefix
  app.setGlobalPrefix(
    'api/v1',
  );

  // Enable CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Security
  app.use(
    helmet(),
  );

  // Compression
  app.use(
    compression(),
  );

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global Exception Filter
  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  // Global HTTP Logging
  app.useGlobalInterceptors(
    new HttpLoggingInterceptor(),
  );

  // Swagger Configuration
  const config =
    new DocumentBuilder()
      .setTitle(
        'AyurScan API',
      )
      .setDescription(
        'AI-powered Medicinal Plant Identification API',
      )
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'api/docs',
    app,
    document,
  );

  // Start Server
  const port =
    process.env.PORT || 3000;

  await app.listen(port);

  console.log(
    `🚀 Server: http://localhost:${port}/api/v1`,
  );

  console.log(
    `📘 Swagger: http://localhost:${port}/api/docs`,
  );
}

bootstrap();