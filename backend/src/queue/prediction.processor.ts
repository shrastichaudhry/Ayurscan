import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('prediction')
export class PredictionProcessor extends WorkerHost {
  async process(job: Job<any>) {
    console.log('==========================');
    console.log('🚀 Processing Prediction Job');
    console.log('Job ID:', job.id);
    console.log('Job Name:', job.name);
    console.log('Payload:', job.data);
    console.log('==========================');

    // Temporary result
    return {
      success: true,
    };
  }
}