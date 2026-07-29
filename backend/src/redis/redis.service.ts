import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import Redis from 'ioredis';

@Injectable()
export class RedisService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger =
    new Logger(RedisService.name);

  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis(
      process.env.REDIS_URL ||
        'redis://localhost:6379',
      {
        lazyConnect: true,
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => {
          return Math.min(
            times * 100,
            3000,
          );
        },
      },
    );

    this.redis.on(
      'connect',
      () => {
        this.logger.log(
          'Redis connected',
        );
      },
    );

    this.redis.on(
      'ready',
      () => {
        this.logger.log(
          'Redis ready',
        );
      },
    );

    this.redis.on(
      'error',
      (error) => {
        this.logger.error(
          `Redis error: ${error.message}`,
        );
      },
    );

    this.redis.on(
      'close',
      () => {
        this.logger.warn(
          'Redis connection closed',
        );
      },
    );
  }

  async onModuleInit() {
    try {
      await this.redis.connect();

      this.logger.log(
        'Redis connection initialized',
      );
    } catch (error) {
      this.logger.error(
        'Redis unavailable. Application will continue without Redis.',
      );
    }
  }

  async onModuleDestroy() {
    try {
      if (
        this.redis.status !== 'end'
      ) {
        await this.redis.quit();
      }
    } catch (error) {
      this.logger.warn(
        'Redis shutdown failed',
      );
    }
  }

  async ping(): Promise<string> {
    return this.redis.ping();
  }

  getClient(): Redis {
    return this.redis;
  }

  isReady(): boolean {
    return (
      this.redis.status === 'ready'
    );
  }
}