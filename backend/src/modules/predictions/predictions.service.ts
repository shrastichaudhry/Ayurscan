import {
  Injectable,
  InternalServerErrorException,
 } from '@nestjs/common';

 import { ConfigService } from '@nestjs/config';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';
import { v2 as cloudinary } from 'cloudinary';

import { PrismaService } from '../../prisma/prisma.service';
import { CacheService } from '../../cache/cache.service';
import { CustomMetricsService } from '../../metrics/custom-metrics.service';

import { CreatePredictionDto } from './dto/create-prediction.dto';

import {
  CACHE_KEYS,
} from '../../cache/cache.constants';

import {
  generateImageHash,
} from '../../common/utils/hash.util';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface PredictionResult {
  prediction: string;
  confidence: number;
}

@Injectable()
export class PredictionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly cache: CacheService,
    private readonly metrics: CustomMetricsService,
    private readonly configService: ConfigService,
  ) {}

  // =====================================================
  // Save Prediction History
  // =====================================================

  async create(
    userId: string,
    createPredictionDto: CreatePredictionDto,
  ) {
    const prediction =
      await this.prisma.predictionHistory.create({
        data: {
          userId,
          plantId: createPredictionDto.plantId,
          confidence:
            createPredictionDto.confidence,
          imageUrl:
            createPredictionDto.imageUrl,
        },
      });

    // invalidate history cache
    await this.cache.del(
      CACHE_KEYS.PREDICTIONS(userId),
    );

    return prediction;
  }

  // =====================================================
  // Prediction History
  // =====================================================

  async findAll(userId: string) {
    const cacheKey =
      CACHE_KEYS.PREDICTIONS(userId);

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

  // =====================================================
  // Delete Prediction History
  // =====================================================

  async remove(
    userId: string,
    predictionId: string,
  ) {
    const prediction =
      await this.prisma.predictionHistory.findFirst({
        where: {
          id: predictionId,
          userId,
        },
      });

    if (!prediction) {
      throw new Error(
        'Prediction not found',
      );
    }

    const publicId =
      this.getCloudinaryPublicId(
        prediction.imageUrl,
      );

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
      }
    }

    const deleted =
      await this.prisma.predictionHistory.delete({
        where: {
          id: predictionId,
        },
      });

    await this.cache.del(
      CACHE_KEYS.PREDICTIONS(userId),
    );

    return {
      success: true,
      message:
        'Prediction history deleted successfully',
      id: deleted.id,
    };
  }

  // =====================================================
  // Predict Plant
  // =====================================================

  async predictPlant(
    userId: string,
    file: Express.Multer.File,
  ) {
    const endTimer =
      this.metrics.startPredictionTimer();

    try {
      const hash =
        generateImageHash(file.buffer);

      const cacheKey =
        CACHE_KEYS.PREDICTION(hash);

      // ==============================
      // Upload image to Cloudinary
      // ==============================

      const cloudinaryResult =
        await new Promise<any>(
          (resolve, reject) => {
            const uploadStream =
              cloudinary.uploader.upload_stream(
                {
                  folder:
                    'AyurScan/Predictions',
                  resource_type:
                    'image',
                },
                (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                },
              );

            uploadStream.end(
              file.buffer,
            );
          },
        );

      const imageUrl =
        cloudinaryResult.secure_url;

      console.log(
        '☁️ Cloudinary Image URL:',
        imageUrl,
      );

      // ==============================
      // Prediction Cache
      // ==============================

      let aiResult: PredictionResult;

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
            filename:
              file.originalname,
            contentType:
              file.mimetype,
          },
        );

        const response =
          await firstValueFrom(
            this.httpService.post(
              `${this.configService.get<string>('AI_SERVICE_URL')}/predict/`,
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
        '🤖 AI predicted:',
        aiResult.prediction,
      );

      // ==========================================
      // 3. Find predicted plant in database
      // ==========================================
            const plantName =
        aiResult.prediction;
      
      console.log('🔍 AI prediction raw:', JSON.stringify(plantName));
console.log('🔍 AI prediction trimmed:', JSON.stringify(plantName.trim()));

const allPlants = await this.prisma.plant.findMany({
  select: {
    id: true,
    commonName: true,
  },
});

console.log('🌿 Plants visible to backend:', allPlants);

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
      // Save prediction history
      // ==========================================

      const prediction =
        await this.prisma.predictionHistory.create({
          data: {
            userId,
            plantId: plant.id,
            confidence: aiResult.confidence,
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

      // Invalidate prediction history cache
      await this.cache.del(
        CACHE_KEYS.PREDICTIONS(userId),
      );

      // ==========================================
      // Prometheus Metrics
      // ==========================================

      this.metrics.incrementPredictions();
      this.metrics.incrementPredictionSuccess();

      // ==========================================
      // Final Response
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
      
       this.metrics.incrementPredictionFailure();

      throw new InternalServerErrorException(
        error?.message ??
          'Prediction failed',
      );

    } finally {

      // Always record response time
      endTimer({
        endpoint: '/predict',
      });

    }
  }

  // =====================================================
  // Cloudinary Helper
  // =====================================================

  private getCloudinaryPublicId(
    imageUrl: string,
  ): string | null {

    try {

      const url =
        new URL(imageUrl);

      const parts =
        url.pathname.split('/');

      const uploadIndex =
        parts.indexOf('upload');

      if (uploadIndex === -1) {
        return null;
      }

      let publicIdParts =
        parts.slice(uploadIndex + 1);

      // Remove version folder (v123456789)
      if (
        publicIdParts[0]?.startsWith('v')
      ) {
        publicIdParts =
          publicIdParts.slice(1);
      }

      const publicId =
        publicIdParts.join('/');

      return publicId.replace(
        /\.[^/.]+$/,
        '',
      );

    } catch (error) {

      console.error(
        '❌ Failed to extract Cloudinary Public ID',
        error,
      );

      return null;

    }
  }
}