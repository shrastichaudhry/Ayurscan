import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { UploadService } from './upload.service';

@ApiTags('AI Upload')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',

        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 100000);

          callback(
            null,
            uniqueName + extname(file.originalname),
          );
        },
      }),
    }),
  )
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Upload Plant Image',
  })
  uploadImage(
    @UploadedFile() file: any,
  ) {
    return this.uploadService.uploadImage(file);
  }
}