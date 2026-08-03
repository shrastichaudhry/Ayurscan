import { Module } from '@nestjs/common';

import { RedisModule } from '../redis/redis.module';
import { CacheService } from './cache.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RedisModule, ConfigModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}