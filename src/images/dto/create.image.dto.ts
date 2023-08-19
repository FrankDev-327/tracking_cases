import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ example: '0120b3c2-6059-45f0-80dc-55524f567e35le' }) // Add ApiProperty decorator with example
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'Image Name Example' }) // Add ApiProperty decorator with example
  @IsString()
  name_file: string;

  @ApiProperty({ example: 'png' }) // Add ApiProperty decorator with example
  @IsString()
  ext_file: string;

  @ApiProperty({ example: 'https://example.com/image.png' }) // Add ApiProperty decorator with example
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({ example: 'public-image-id' }) // Add ApiProperty decorator with example
  @IsString()
  @IsOptional()
  public_img_id?: string;

  @ApiProperty({ example: 1024 }) // Add ApiProperty decorator with example
  @IsNumber()
  @IsOptional()
  size_file?: number;
}
