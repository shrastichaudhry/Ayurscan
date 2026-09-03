import { Module } from '@nestjs/common';

import { CacheModule } from '../cache/cache.module';

import { MetricsController } from './metrics.controller';
import { PrometheusService } from './prometheus.service';
import { CustomMetricsService } from './custom-metrics.service';

@Module({
  imports: [
    CacheModule,
  ],

  controllers: [
    MetricsController,
  ],

  providers: [
    PrometheusService,
    CustomMetricsService,
  ],

  exports: [
    PrometheusService,
    CustomMetricsService,
  ],
})
export class MetricsModule {}