import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { v2 as cloudinary } from 'cloudinary';
import { CacheService } from '../../cache/cache.service';
import { CACHE_KEYS, } from '../../cache/cache.constants';

import { generateImageHash, } from '../../common/utils/hash.util';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class PredictionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly cache: CacheService,
  ) {}

  async create(
  userId: string,
  createPredictionDto: CreatePredictionDto,
) {
  const prediction =
    await this.prisma.predictionHistory.create({
      data: {
        userId,
        plantId: createPredictionDto.plantId,
        confidence: createPredictionDto.confidence,
        imageUrl: createPredictionDto.imageUrl,
      },
    });

  // Invalidate prediction history cache
  await this.cache.del(
    CACHE_KEYS.PREDICTIONS(userId),
  );

  return prediction;
}

  async findAll(userId: string) {
  const cacheKey = CACHE_KEYS.PREDICTIONS(userId);

  const cached =
    await this.cache.get(cacheKey);

  if (cached) {
    console.log(
      '✅ Prediction history loaded from Redis',
    );

    return cached;
  }

  const history =
    await this.prisma.predictionHistory.findMany({
      where: {
        userId,
      },
      include: {
        plant: true,
      },
      orderBy: {
        predictedAt: 'desc',
      },
    });

  console.log(
    '📦 Prediction history loaded from Database',
  );

  await this.cache.set(
    cacheKey,
    history,
    this.cache.getPredictionTTL(),
  );

  return history;
}

async remove(
  userId: string,
  predictionId: string,
) {
  // 1. Find prediction belonging to logged-in user
  const prediction =
    await this.prisma.predictionHistory.findFirst({
      where: {
        id: predictionId,
        userId,
      },
    });

  // 2. Check if prediction exists
  if (!prediction) {
    throw new Error(
      'Prediction not found',
    );
  }

  // 3. Extract Cloudinary public ID
  const publicId =
    this.getCloudinaryPublicId(
      prediction.imageUrl,
    );

  // 4. Delete image from Cloudinary
  if (publicId) {
    try {
      await cloudinary.uploader.destroy(
        publicId,
        {
          resource_type: 'image',
        },
      );

      console.log(
        '☁️ Cloudinary image deleted:',
        publicId,
      );

    } catch (error) {
      console.error(
        '❌ Cloudinary deletion failed:',
        error,
      );

      // We don't stop database deletion
      // if Cloudinary deletion fails
    }
  }

  // 5. Delete prediction history
  const deletedPrediction =
    await this.prisma.predictionHistory.delete({
      where: {
        id: predictionId,
      },
    });

  await this.cache.del(
    CACHE_KEYS.PREDICTIONS(userId),
);

  // 6. Return response
  return {
    success: true,
    message:
      'Prediction history deleted successfully',
    id: deletedPrediction.id,
  };
}

async predictPlant(
  userId: string,
  file: Express.Multer.File,
) {
  try {
    const hash =
      generateImageHash(file.buffer);

    const cacheKey =
      CACHE_KEYS.PREDICTION(hash);

    // ==========================================
    // 1. Upload image to Cloudinary
    // ==========================================

    const cloudinaryResult =
      await new Promise<any>((resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder: 'AyurScan/Predictions',
              resource_type: 'image',
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );

        uploadStream.end(file.buffer);
      });

    const imageUrl = cloudinaryResult.secure_url;

    console.log(
      '☁️ Cloudinary Image URL:',
      imageUrl,
    );

    // ==========================================
// 2. Check Redis Cache
// ==========================================

let aiResult;

const cached =
  await this.cache.get(cacheKey);

if (cached) {

  console.log(
    '✅ Prediction loaded from Redis',
  );

  aiResult = cached;

} else {

  console.log(
    '📦 Calling AI Service...',
  );

  const formData =
    new FormData();

  formData.append(
    'file',
    file.buffer,
    {
      filename: file.originalname,
      contentType: file.mimetype,
    },
  );

  const response =
    await firstValueFrom(
      this.httpService.post(
        'http://localhost:8000/predict/',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      ),
    );

  aiResult = response.data;

  await this.cache.set(
    cacheKey,
    aiResult,
    this.cache.getPredictionTTL(),
  );

}

console.log(
  '🤖 AI predicted plant:',
  aiResult.prediction,
);

    // ==========================================
    // 3. Find predicted plant in database
    // ==========================================

    const plantName = aiResult.prediction;

    const plant =
      await this.prisma.plant.findFirst({
        where: {
          commonName: {
            equals: plantName.trim(),
            mode: 'insensitive',
          },
        },
      });

    if (!plant) {
      throw new Error(
        `Plant "${plantName}" not found in database`,
      );
    }

    // ==========================================
    // 4. Save prediction history
    // ==========================================

    const prediction =
      await this.prisma.predictionHistory.create({
        data: {
          userId,
          plantId: plant.id,
          confidence: aiResult.confidence,

          // Save Cloudinary URL
          imageUrl,
        },
        include: {
          plant: true,
        },
      });

    console.log(
      '✅ Prediction history saved:',
      prediction.id,
    );

    // ==========================================
    // 5. Return final response
    // ==========================================

    return {
      success: true,
      prediction: aiResult.prediction,
      confidence: aiResult.confidence,
      predictionId: prediction.id,
      imageUrl,
      plant: prediction.plant,
    };

  } catch (error: any) {

    console.error(
      '❌ Prediction Error:',
      error,
    );

    throw new InternalServerErrorException(
      error?.message ||
      'Prediction failed',
    );
  }
}

private getCloudinaryPublicId(
  imageUrl: string,
): string | null {
  try {
    const url = new URL(imageUrl);

    const parts = url.pathname.split('/');

    // Find "upload" position
    const uploadIndex =
      parts.indexOf('upload');

    if (uploadIndex === -1) {
      return null;
    }

    // Get everything after "upload"
    let publicIdParts =
      parts.slice(uploadIndex + 1);

    // Remove version part like v123456789
    if (
      publicIdParts[0]?.startsWith('v')
    ) {
      publicIdParts =
        publicIdParts.slice(1);
    }

    // Join folder + filename
    const publicIdWithExtension =
      publicIdParts.join('/');

    // Remove file extension
    return publicIdWithExtension.replace(
      /\.[^/.]+$/,
      '',
    );

  } catch (error) {
    console.error(
      '❌ Failed to extract Cloudinary public ID:',
      error,
    );

    return null;
  }
}

}