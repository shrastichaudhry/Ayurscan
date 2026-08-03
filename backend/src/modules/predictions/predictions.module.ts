import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';


import { PredictionsController } from './predictions.controller';
import { PredictionsService } from './predictions.service';

import { PrismaModule } from '../../prisma/prisma.module';
import { CacheModule } from '../../cache/cache.module';
import { QueueModule } from '../../queue/queue.module';

@Module({
  imports: [PrismaModule, HttpModule, CacheModule, QueueModule],
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule {}