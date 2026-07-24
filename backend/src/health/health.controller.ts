import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';

import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly healthService: HealthService,
  ) {}

  // Full health check
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.healthService.checkDatabase(),
    ]);
  }

  // Liveness probe
  // Does not depend on PostgreSQL
  @Get('live')
  liveness() {
    return {
      status: 'ok',
    };
  }

  // Readiness probe
  // Checks PostgreSQL connection
  @Get('ready')
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.healthService.checkDatabase(),
    ]);
  }
}