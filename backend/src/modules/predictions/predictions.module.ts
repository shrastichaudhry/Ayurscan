import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';


import { PredictionsController } from './predictions.controller';
import { PredictionsService } from './predictions.service';

import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule {}