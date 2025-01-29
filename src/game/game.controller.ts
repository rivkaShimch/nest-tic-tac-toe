import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GameplayMoveDto, GameplayResponseDto } from './dto/gameplay.dto';

@Controller('api')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @Get('game')
  @ApiOperation({ summary: 'Get current game state' })
  @ApiQuery({
    name: 'playerEmail',
    required: true,
    description: 'Player email'
  })
  async getGame(
    @Query('playerEmail') playerEmail: string,
  ) {
    return await this.gameService.getOrCreateGame(playerEmail);
  }


  @Post('gameplay')
  @ApiOperation({ summary: 'Make a move or start a game' })
  @ApiQuery({
    name: 'playerEmail',
    required: false,
    description: 'Player email'
  })
  @ApiBody({ type: GameplayMoveDto })
  async gameplay(
    @Query('playerEmail') playerEmail: string,
    @Query('hard') hard: string,
    @Body() move: GameplayMoveDto
  ): Promise<GameplayResponseDto> {
    return this.gameService.processMove(playerEmail, { row: move.row, column: move.column }, hard);
  }

  @Get('restart')
  @ApiOperation({ summary: 'Restart current game' })
  @ApiQuery({
    name: 'playerEmail',
    required: true,
    description: 'Player email'
  })
  async restartGame(
    @Query('playerEmail') playerEmail: string,
  ) {
    return await this.gameService.restartGame(playerEmail);
  }
}