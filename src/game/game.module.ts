import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game, GameSchema } from '../database/schemas/game.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from 'src/database/schemas/player.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Game.name, schema: GameSchema },
    { name: Player.name, schema: PlayerSchema }
  ])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule { }
