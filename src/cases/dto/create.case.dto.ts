import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCaseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Case Name Example' }) // Add ApiProperty decorator with example
  name_case: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Case Description Example' }) // Add ApiProperty decorator with example
  description_case: string;
}
