import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { PrismaService } from '../prisma/prisma.service';
import { HealthIndicatorService } from '@nestjs/terminus';
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
            provide: HealthIndicatorService,
            useValue: {},
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