import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GameplayMoveDto {
  @ApiPropertyOptional({
    description: 'Row index (0-2)',
    minimum: 0,
    maximum: 2,
    example: 1
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2)
  @Type(() => Number)
  row?: number;

  @ApiPropertyOptional({
    description: 'Column index (0-2)',
    minimum: 0,
    maximum: 2,
    example: 1
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2)
  @Type(() => Number)
  column?: number;
}

export class GameplayResponseDto {
  @ApiProperty({
    enum: ['ongoing', 'win', 'draw'],
    example: 'ongoing',
    description: 'Current game status'
  })
  status: string;

  @ApiPropertyOptional({
    description: "Bot's move coordinates",
    example: { row: 1, column: 1 }
  })
  botMove?: {
    row: number;
    column: number;
  } | null;
}