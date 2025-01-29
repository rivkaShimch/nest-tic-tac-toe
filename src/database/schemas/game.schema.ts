import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'
@Schema({ timestamps: true })
export class Game  extends Document {
  
  
    @Prop({ required: true, lowercase: true, trim: true })
  playerEmail: string;

  @Prop({ 
    type: [[String]], 
    default: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ] 
  })
  board: string[][];

  @Prop({ 
    enum: ['ongoing', 'win', 'draw','lose'], 
    default: 'ongoing' 
  })
  status: string;

  @Prop({ default: 'player' })
  currentTurn: string;

  @Prop()
  winner: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
