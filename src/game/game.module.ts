import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Game, GameSchema } from '../database/schemas/game.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Game.name, schema: GameSchema }
  ])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule { }
