import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueService } from './queue.service';
import { PredictionProcessor } from './prediction.processor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT || 6379),
      },
    }),

    BullModule.registerQueue({
      name: 'prediction',
    }),
  ],
  providers: [QueueService, PredictionProcessor],

  exports: [BullModule, QueueService],
})
export class QueueModule {}