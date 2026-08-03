import { Module } from '@nestjs/common';

import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

import { PrismaModule } from '../../prisma/prisma.module';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CacheModule } from '../../cache/cache.module';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [PlantsController],
  providers: [PlantsService, RolesGuard],
})
export class PlantsModule {}