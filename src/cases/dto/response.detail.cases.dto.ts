import { ApiProperty } from '@nestjs/swagger';
import { ResponseCreateNoteDto } from 'src/notes/dto/response.create.note.dto';
import { ResponseCreateImageDto } from 'src/images/dto/response.create.image.dto';

export class ResponseDetailsCasesDto {
  @ApiProperty({ example: '9ace4524-db36-4c2d-a0ef-d43da592f912' })
  readonly id: string;

  @ApiProperty({ example: '2023-07-28T10:56:13.017Z' })
  readonly created: string;

  @ApiProperty({ example: '2023-07-28T10:56:13.017Z' })
  readonly updated: string;

  @ApiProperty({ example: 'test case 2' })
  readonly name_case: string;

  @ApiProperty({ example: 'test description 2' })
  readonly description_case: string;

  @ApiProperty({ example: false })
  readonly state: boolean;

  @ApiProperty({ type: [ResponseCreateImageDto] })
  readonly image: ResponseCreateImageDto[];

  @ApiProperty({ type: [ResponseCreateNoteDto] })
  readonly note: ResponseCreateNoteDto[];
}
