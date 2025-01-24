import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ type: Number, default: null })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({ type: Number, default: null })
  @IsOptional()
  @IsNumber()
  sequence: number;

  @ApiProperty({ type: Number, default: null })
  @IsOptional()
  @IsNumber()
  value: GLfloat;

  @ApiProperty({ type: Boolean, default: null })
  @IsOptional()
  @IsBoolean()
  priority: boolean;

  @ApiProperty({ type: Number, default: null })
  @IsOptional()
  @IsNumber()
  routeId: number;
}
