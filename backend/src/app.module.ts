import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PlantsModule } from './modules/plants/plants.module';

import { FavoritesModule } from './modules/favorites/favorites.module';
import { PredictionsModule } from './modules/predictions/predictions.module';

import { UploadModule } from './modules/upload/upload.module';

// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './common/guards/roles.guard';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PlantsModule,
    FavoritesModule,
    PredictionsModule,
    UploadModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}