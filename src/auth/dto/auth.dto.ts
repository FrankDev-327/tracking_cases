import { IsString, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  identificationId: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
