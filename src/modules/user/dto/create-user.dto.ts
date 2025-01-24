import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUsertDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly firstName!: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly lastName!: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly avatar?: string;

  @ApiProperty({ type: String, default: 'string!12345' })
  @IsOptional()
  @IsString()
  /*   @Length(6, 20)
  @Matches(/[\d\W]/, {
    message:
      'password must contain at least one digit and/or special character',
  })
  @Matches(/[a-zA-Z]/, { message: 'password must contain at least one letter' })
  @Matches(/^\S+$/, { message: 'password must not contain spaces' }) */
  readonly password!: string;

  /* @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly document!: string; */

  /*   @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly phone?: string; */
}
