import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @ApiProperty({ example: 'Note text example' }) // Add ApiProperty decorator with example
  text_note: string;

  @IsString()
  @ApiProperty({ example: '0120b3c2-6059-45f0-80dc-55524f567e35le' }) // Add ApiProperty decorator with example
  caseId: string;
}
