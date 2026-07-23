import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  FileInterceptor,
} from '@nestjs/platform-express';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';

import { PredictionsService } from './predictions.service';
import { CreatePredictionDto } from './dto/create-prediction.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

@ApiTags('Predictions')
@Controller('predictions')
export class PredictionsController {
  constructor(
    private readonly predictionsService: PredictionsService,
  ) {}

   @Get()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiOperation({
  summary: 'Get logged-in user prediction history',
})
findAll(@Req() req: any) {
  return this.predictionsService.findAll(
    req.user.id,
  );
}

@Delete(':id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiOperation({
  summary: 'Delete prediction history',
})
remove(
  @Req() req: any,
  @Param('id') id: string,
) {
  return this.predictionsService.remove(
    req.user.id,
    id,
  );
}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Save prediction history',
  })
  create(
    @Req() req: any,
    @Body() createPredictionDto: CreatePredictionDto,
  ) {
    return this.predictionsService.create(
      req.user.id,
      createPredictionDto,
    );
  }

  @Post('predict')
@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor('file'))
@ApiBearerAuth('JWT-auth')
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    required: ['file'],
  },
})
async predict(
  @Req() req: any,
  @UploadedFile(
    new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: 5 * 1024 * 1024,
      }),

      new FileTypeValidator({
        fileType: /^image\/(jpeg|jpg|png|webp)$/,
      }),
    ],
  }),
  ) file: Express.Multer.File,
) {
  return this.predictionsService.predictPlant(
    req.user.id,
    file,
  );
}

}