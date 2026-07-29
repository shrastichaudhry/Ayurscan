import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { PrismaService } from '../prisma/prisma.service';
import { HealthIndicatorService } from '@nestjs/terminus';
import { RedisService } from '../redis/redis.service';
import {
  describe,
  beforeEach,
  it,
  expect,
  jest,
  
} from '@jest/globals';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          HealthService,

          {
            provide: PrismaService,
            useValue: {
              $queryRaw: jest.fn(),
            },
          },
           
          {
            provide: RedisService,
            useValue: {
              ping: jest.fn(),
            },
          },

          {
            provide: HealthIndicatorService,
            useValue: {
              check: jest.fn().mockReturnValue({
                up: jest.fn(),
                down: jest.fn(),
              })
            },
          },
        ],
      }).compile();

    service =
      module.get<HealthService>(
        HealthService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});