import { Injectable } from '@nestjs/common';

import {
  register,
  collectDefaultMetrics,
} from 'prom-client';

@Injectable()
export class PrometheusService {

  constructor() {

    collectDefaultMetrics({
      register,
    });

  }

  async getMetrics(): Promise<string> {
    return register.metrics();
  }

}