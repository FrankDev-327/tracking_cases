import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepartamentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Department Name Example' }) // Add ApiProperty decorator with example
  name_departament: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Section Example' }) // Add ApiProperty decorator with example
  section: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '0120b3c2-6059-45f0-80dc-55524f567e35le' }) // Add ApiProperty decorator with example
  userId: string;
}
