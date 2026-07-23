import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

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

  async search(name: string) {
  return this.prisma.plant.findMany({
    where: {
      commonName: {
        contains: name,
        mode: 'insensitive',
      },
    },
    orderBy: {
      commonName: 'asc',
    },
  });
}

  async findOne(id: string) {
  return this.prisma.plant.findUnique({
    where: {
      id,
    },
  });
}

  async update(id: string, updatePlantDto: UpdatePlantDto) {
  return this.prisma.plant.update({
    where: {
      id,
    },
    data: updatePlantDto,
  });
}

async remove(id: string) {
  return this.prisma.plant.delete({
    where: {
      id,
    },
  });
}
}