import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../../cache/cache.service';

import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

import {
  CACHE_KEYS,
} from '../../cache/cache.constants';

@Injectable()
export class PlantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  // ==========================
  // Create Plant
  // ==========================
  async create(createPlantDto: CreatePlantDto) {
    const plant =
      await this.prisma.plant.create({
        data: createPlantDto,
      });

    // Invalidate cache
    await this.cache.del(
      CACHE_KEYS.PLANTS_ALL,
    );

    return plant;
  }

  // ==========================
  // Get All Plants (Cache Aside)
  // ==========================
  async findAll() {
    const cacheKey =
      CACHE_KEYS.PLANTS_ALL;

    const cachedPlants =
      await this.cache.get(cacheKey);

    if (cachedPlants) {
      console.log(
        '✅ Plants loaded from Redis',
      );

      return cachedPlants;
    }

    const plants =
      await this.prisma.plant.findMany({
        orderBy: {
          commonName: 'asc',
        },
      });

    await this.cache.set(
      cacheKey,
      plants,
      this.cache.getPlantsTTL(),
    );

    console.log(
      '📦 Plants loaded from Database',
    );

    return plants;
  }

  // ==========================
  // Search Plants (Cache Aside)
  // ==========================
  async search(name: string) {
    const cacheKey =
      CACHE_KEYS.SEARCH(name);

    const cachedResults =
      await this.cache.get(cacheKey);

    if (cachedResults) {
      console.log(
        '✅ Search loaded from Redis',
      );

      return cachedResults;
    }

    const plants =
      await this.prisma.plant.findMany({
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

    await this.cache.set(
      cacheKey,
      plants,
      this.cache.getSearchTTL(),
    );

    console.log(
      '📦 Search loaded from Database',
    );

    return plants;
  }

  // ==========================
  // Get Plant By ID (Cache Aside)
  // ==========================
  async findOne(id: string) {
    const cacheKey =
      CACHE_KEYS.PLANT(id);

    const cachedPlant =
      await this.cache.get(cacheKey);

    if (cachedPlant) {
      console.log(
        '✅ Plant loaded from Redis',
      );

      return cachedPlant;
    }

    const plant =
      await this.prisma.plant.findUnique({
        where: {
          id,
        },
      });

    if (!plant) {
      throw new NotFoundException(
        'Plant not found',
      );
    }

    await this.cache.set(
      cacheKey,
      plant,
      this.cache.getPlantsTTL(),
    );

    console.log(
      '📦 Plant loaded from Database',
    );

    return plant;
  }

  // ==========================
  // Update Plant
  // ==========================
  async update(
    id: string,
    updatePlantDto: UpdatePlantDto,
  ) {
    const existing =
      await this.prisma.plant.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      throw new NotFoundException(
        'Plant not found',
      );
    }

    const updated =
      await this.prisma.plant.update({
        where: {
          id,
        },
        data: updatePlantDto,
      });

    // Invalidate cache
    await this.cache.del(
      CACHE_KEYS.PLANT(id),
    );

    await this.cache.del(
      CACHE_KEYS.PLANTS_ALL,
    );

    return updated;
  }

  // ==========================
  // Delete Plant
  // ==========================
  async remove(id: string) {
    const existing =
      await this.prisma.plant.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      throw new NotFoundException(
        'Plant not found',
      );
    }

    const deleted =
      await this.prisma.plant.delete({
        where: {
          id,
        },
      });

    // Invalidate cache
    await this.cache.del(
      CACHE_KEYS.PLANT(id),
    );

    await this.cache.del(
      CACHE_KEYS.PLANTS_ALL,
    );

    return deleted;
  }
}