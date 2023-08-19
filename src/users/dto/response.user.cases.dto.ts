import { ApiProperty } from '@nestjs/swagger';
import { ResponseCasesUserDto } from '../../cases/dto/response.case.user.dto';

export class ResponseUserCasesDto {
  @ApiProperty({ example: 'e1859fda-fc40-4b15-a7fd-3715fe2a8df4' })
  readonly id: string;

  @ApiProperty({ example: 'ABCD1234' })
  readonly identification_id: string;

  @ApiProperty({ type: [ResponseCasesUserDto] })
  readonly cases: ResponseCasesUserDto[];
}
