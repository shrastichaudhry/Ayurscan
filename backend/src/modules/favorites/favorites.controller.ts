import {
  Controller,
  Delete,
  Param,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { FavoritesService } from './favorites.service';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
  ) {}
   
   @Get()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiOperation({
  summary: 'Get all favorite plants of logged-in user',
})
getFavorites(@Req() req: any) {
  return this.favoritesService.getFavorites(req.user.id);
}

@Delete(':plantId')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiOperation({
  summary: 'Remove plant from favorites',
})
removeFavorite(
  @Req() req: any,
  @Param('plantId') plantId: string,
) {
  return this.favoritesService.removeFavorite(
    req.user.id,
    plantId,
  );
}

  @Post(':plantId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Add plant to favorites',
  })
  addToFavorites(
    @Req() req: any,
    @Param('plantId') plantId: string,
  ) {
    return this.favoritesService.addToFavorites(
      req.user.id,
      plantId,
    );
  }
}