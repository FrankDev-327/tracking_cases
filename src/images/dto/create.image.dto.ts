import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name_file: string;

  @IsString()
  ext_file: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  public_img_id?: string;

  @IsNumber()
  @IsOptional()
  size_file?: number;
}
