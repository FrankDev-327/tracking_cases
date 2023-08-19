import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @ApiProperty({ example: 'Document Name Example' }) // Add ApiProperty decorator with example
  name_document: string;
}
