import { Injectable } from '@nestjs/common';
import {
  HealthIndicatorService,
  HealthIndicatorResult,
} from '@nestjs/terminus';

import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly healthIndicatorService: HealthIndicatorService,
  ) {}

  async checkDatabase(): Promise<HealthIndicatorResult> {
    const indicator =
      this.healthIndicatorService.check('database');

    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return indicator.up();
    } catch (error) {
      return indicator.down({
        message: 'Database connection failed',
      });
    }
  }

  async checkRedis(): Promise<HealthIndicatorResult> {
  const indicator =
    this.healthIndicatorService.check(
      'redis',
    );

  try {
    await this.redis.ping();

    return indicator.up();
  } catch (error) {
    return indicator.down({
      message:
        'Redis connection failed',
    });
  }
}

}