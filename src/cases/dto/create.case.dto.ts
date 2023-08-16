import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCaseDto {
  @IsNotEmpty()
  @IsString()
  name_case: string;

  @IsNotEmpty()
  @IsString()
  description_case: string;
}
