import { Injectable } from '@nestjs/common';

import { RedisService } from '../redis/redis.service';

@Injectable()
export class CacheService {
  constructor(
    private readonly redis: RedisService,
  ) {}

  async get(key: string) {
    return this.redis
      .getClient()
      .get(key);
  }

  async set(
    key: string,
    value: unknown,
    ttl = 300,
  ) {
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
}