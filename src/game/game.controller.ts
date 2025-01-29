import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { GameResponseDto } from './dto/game-response.dto';
import { GameplayMoveDto, GameplayResponseDto } from './dto/gameplay.dto';
import { Game } from 'src/database/schemas/game.schema';

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
    @Body() move?: GameplayMoveDto
  ): Promise<GameplayResponseDto> {
    // If no move is provided, this is the first turn
    if (!move || (move.row === undefined || move.column === undefined)) {
      const game = await this.gameService.getOrCreateGame(playerEmail);

      // Bot makes first move if it's bot's turn
      if (game.currentTurn === 'bot') {
        const { status, botMove } = await this.gameService.processMove(playerEmail, null);
        return { status, botMove };
      }

      return {
        status: game.status,
        botMove: null
      };
    }

    // Process player's move and get bot's response
    return this.gameService.processMove(playerEmail, { row: move.row, column: move.column });
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