import { ApiProperty } from '@nestjs/swagger';

export class GameResponseDto {

  @ApiProperty({
    example: 'player@gmail.com'
  })
  playerEmail: string;

  @ApiProperty({
    example: [
      ['X', '', 'O'],
      ['', 'X', ''],
      ['O', '', '']
    ]
  })
  board: string[][];

  @ApiProperty({
    example: 'OnGoing',
    enum: ['OnGoing', 'Win', 'Draw','Lose']
  })
  status: string;

  @ApiProperty({
    example: 'player',
    enum: ['player', 'bot']
  })
  currentTurn: string;

  @ApiProperty({
    example: 'player',
    enum: ['player', 'bot', null],
    nullable: true
  })
  winner?: string | null;
}