import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema({ timestamps: true })
export class Player {
  @Prop({ 
    required: true, 
    lowercase: true, 
    trim: true, 
    unique: true 
  })
  playerEmail: string;

  @Prop({ default: 0 })
  gamesPlayed: number;

  @Prop({ default: 0 })
  wins: number;

  @Prop({ default: 0 })
  draws: number;

  @Prop({ default: 0 })
  losses: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);