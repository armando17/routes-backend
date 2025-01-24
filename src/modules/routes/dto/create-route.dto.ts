import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRouteDto {
  @ApiProperty({ type: Number, default: null })
  @IsNumber()
  id: number;

  @ApiProperty({ type: String, default: null })
  @IsString()
  date: string;

  @ApiProperty({ type: String, default: null })
  @IsString()
  notes: string;

  @ApiProperty({ type: Number, default: null })
  @IsNumber()
  driverId: number;

  @ApiProperty({ type: [], default: null })
  @IsOptional()
  @IsArray()
  orders: any;
}
