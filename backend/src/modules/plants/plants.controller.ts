import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';

import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Plants')
@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth('JWT-auth')
@ApiOperation({
  summary: 'Create a new medicinal plant (Admin only)',
})
create(@Body() createPlantDto: CreatePlantDto) {
  return this.plantsService.create(createPlantDto);
}

  @Get()
  @ApiOperation({
    summary: 'Get all medicinal plants',
  })
  findAll() {
    return this.plantsService.findAll();
  }
}
