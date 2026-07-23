import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async addToFavorites(
    userId: string,
    plantId: string,
  ) {
    // Check if plant exists
    const plant = await this.prisma.plant.findUnique({
      where: {
        id: plantId,
      },
    });

    if (!plant) {
      throw new BadRequestException(
        'Plant not found',
      );
    }

    // Check if already favorite
    const existing =
      await this.prisma.favoritePlant.findUnique({
        where: {
          userId_plantId: {
            userId,
            plantId,
          },
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Plant already added to favorites',
      );
    }

    return this.prisma.favoritePlant.create({
      data: {
        userId,
        plantId,
      },
    });
  }

   async getFavorites(userId: string) {
  return this.prisma.favoritePlant.findMany({
    where: {
      userId,
    },
    include: {
      plant: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
}

async removeFavorite(
  userId: string,
  plantId: string,
) {
  const favorite =
    await this.prisma.favoritePlant.findUnique({
      where: {
        userId_plantId: {
          userId,
          plantId,
        },
      },
    });

  if (!favorite) {
    throw new BadRequestException(
      'Favorite plant not found',
    );
  }

  return this.prisma.favoritePlant.delete({
    where: {
      userId_plantId: {
        userId,
        plantId,
      },
    },
  });
}

}