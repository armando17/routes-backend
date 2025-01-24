import { PartialType } from '@nestjs/mapped-types';
import { CreateUsertDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUsertDto extends PartialType(CreateUsertDto) {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  email: string;
}
