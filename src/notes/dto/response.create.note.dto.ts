import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateNoteDto {
  @ApiProperty({ example: 'd0d9f0e9-52e1-4dce-a82d-02c17d422678' })
  readonly id: string;

  @ApiProperty({ example: '2023-08-16T13:34:04.222Z' })
  readonly created: string;

  @ApiProperty({ example: '2023-08-16T13:34:05.348Z' })
  readonly updated: string;

  @ApiProperty({ example: 'test note - 2' })
  readonly text_note: string;
}
