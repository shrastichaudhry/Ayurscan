import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlantDto } from './dto/create-plant.dto';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  create(createPlantDto: CreatePlantDto) {
    return this.prisma.plant.create({
      data: createPlantDto,
    });
  }

  findAll() {
    return this.prisma.plant.findMany({
      orderBy: {
        commonName: 'asc',
      },
    });
  }
}