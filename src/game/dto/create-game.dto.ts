import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    example: 'player@example.com',
    description: 'Email address of the player'
  })
  @IsEmail()
  @IsNotEmpty()
  playerEmail: string;
}