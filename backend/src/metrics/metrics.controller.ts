import {
  Controller,
  Get,
  Header,
} from '@nestjs/common';

import { PrometheusService } from './prometheus.service';

@Controller({
  path: 'metrics',
  version: '1',
})
export class MetricsController {
  constructor(
    private readonly prometheus: PrometheusService,
  ) {}

  @Get()
  @Header(
    'Content-Type',
    'text/plain; version=0.0.4',
  )
  async metrics() {
    return this.prometheus.getMetrics();
  }
}