import { ApiProperty } from '@nestjs/swagger';
import { ResponseCreateImageDto } from 'src/images/dto/response.create.image.dto';

export class ResponseCasesUserDto {
  @ApiProperty({ example: 'test case 300000' })
  readonly name_case: string;

  @ApiProperty({ example: 'test case description 300000' })
  readonly description_case: string;

  @ApiProperty({ example: 'e1859fda-fc40-4b15-a7fd-3715fe2a8df4' })
  readonly id: string;

  @ApiProperty({ example: '2023-08-16T14:14:15.790Z' })
  readonly created: string;

  @ApiProperty({ example: '2023-08-16T14:14:15.790Z' })
  readonly updated: string;

  @ApiProperty({ example: false })
  readonly state: boolean;

  @ApiProperty({ type: [ResponseCreateImageDto] })
  readonly image: ResponseCreateImageDto[];
}
