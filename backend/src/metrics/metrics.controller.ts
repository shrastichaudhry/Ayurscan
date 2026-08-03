import {
  Controller,
  Delete,
  Get,
} from '@nestjs/common';

import { CacheService } from '../cache/cache.service';

@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly cache: CacheService,
  ) {}

  @Get('cache')
  cacheMetrics() {
    return this.cache.getMetrics();
  }

  @Delete('cache')
  resetCacheMetrics() {
    this.cache.resetMetrics();

    return {
      message:
        'Cache metrics reset',
    };
  }
}