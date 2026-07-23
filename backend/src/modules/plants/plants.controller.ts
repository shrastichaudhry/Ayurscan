import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';

// import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UpdatePlantDto } from './dto/update-plant.dto';

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

   @Get('search')
@ApiOperation({
  summary: 'Search medicinal plants by common name',
})
search(@Query('name') name: string) {
  return this.plantsService.search(name);
}

  @Get(':id')
@ApiOperation({
  summary: 'Get medicinal plant by ID',
})
findOne(@Param('id') id: string) {
  return this.plantsService.findOne(id);
}

  @Put(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth('JWT-auth')
@ApiOperation({
  summary: 'Update medicinal plant (Admin only)',
})
update(
  @Param('id') id: string,
  @Body() updatePlantDto: UpdatePlantDto,
) {
  return this.plantsService.update(id, updatePlantDto);
}

@Delete(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth('JWT-auth')
@ApiOperation({
  summary: 'Delete medicinal plant (Admin only)',
})
remove(@Param('id') id: string) {
  return this.plantsService.remove(id);
}
}
