import { Injectable } from '@nestjs/common';

import { RedisService } from '../redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService {

  private hits = 0;
  private misses = 0;

  constructor(
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {}

  async get(key: string) {
    const value = await this.redis
      .getClient()
      .get(key);

      if(!value){
        this.misses++;

        return null;
      }
      this.hits++;

      return JSON.parse(value);
  }

  async set(
    key: string,
    value: unknown,
    ttl = 300,
  ): Promise<void> {
    await this.redis
      .getClient()
      .set(
        key,
        JSON.stringify(value),
        'EX',
        ttl,
      );
  }

  async del(key: string) {
    await this.redis
      .getClient()
      .del(key);
  }

  getPlantsTTL(): number {
  return Number(
    this.config.get('CACHE_TTL_PLANTS', 300),
  );
}

getSearchTTL(): number {
  return Number(
    this.config.get('CACHE_TTL_SEARCH', 120),
  );
}

getPredictionTTL(): number {
  return Number(
    this.config.get('CACHE_TTL_PREDICTION', 86400),
  );
}

getPredictionsTTL(): number {
  return Number(
    this.config.get(
      'CACHE_TTL_PREDICTIONS',
      600,
    ),
  );
}

getMetrics() {
  const requests =
    this.hits + this.misses;

  return {
    hits: this.hits,

    misses: this.misses,

    requests,

    hitRatio:
      requests === 0
        ? '0%'
        : (
            (this.hits / requests) *
            100
          ).toFixed(2) + '%',
  };
}

resetMetrics() {
  this.hits = 0;

  this.misses = 0;
}

}