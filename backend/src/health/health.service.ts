import {
  Injectable,
} from '@nestjs/common';

import {
  HealthCheckService,
  HealthIndicatorResult,
  HealthIndicatorService,
} from '@nestjs/terminus';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
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
}