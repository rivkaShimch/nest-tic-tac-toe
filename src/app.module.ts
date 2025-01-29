import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [GameModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
