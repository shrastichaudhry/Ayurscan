import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
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
import { RedisModule } from './redis/redis.module';
import { CacheModule } from './cache/cache.module';
import { MetricsModule } from './metrics/metrics.module';
import { QueueModule } from './queue/queue.module';
import { RequestIdMiddleware }
from './common/middleware/request-id.middleware';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      }
  ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    PlantsModule,
    FavoritesModule,
    PredictionsModule,
    UploadModule,
    HealthModule,
    RedisModule,
    CacheModule,
    MetricsModule,
    QueueModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule
  implements NestModule
{
  configure(
    consumer: MiddlewareConsumer,
  ) {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes('*');
  }
}