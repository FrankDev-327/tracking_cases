import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John' }) // Add ApiProperty decorator with example
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe' }) // Add ApiProperty decorator with example
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'your_secure_password' }) // Add ApiProperty decorator with example
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'john.doe@example.com' }) // Add ApiProperty decorator with example
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1234567890' }) // Add ApiProperty decorator with example
  identification_id: string;
}
