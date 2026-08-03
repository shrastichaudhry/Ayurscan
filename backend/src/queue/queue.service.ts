import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';

import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('prediction')
    private readonly predictionQueue: Queue,
  ) {}

  async addPredictionJob(data: {
    userId: string;
    imageUrl: string;
  }) {
    const job =
      await this.predictionQueue.add(
        'predict-plant',
        data,
        {
          attempts: 3,

          backoff: {
            type: 'exponential',
            delay: 2000,
          },

          removeOnComplete: 100,

          removeOnFail: 50,
        },
      );

    console.log(
      `🟢 Prediction Job Added: ${job.id}`,
    );

    return {
      jobId: job.id,
    };
  }
}