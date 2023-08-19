import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1234567890' }) // Add ApiProperty decorator with example
  identificationId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'your_secure_password' }) // Add ApiProperty decorator with example
  password: string;
}
