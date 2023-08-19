import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateDepartamentDto {
  @ApiProperty({ example: 'name_departament' })
  readonly name_departament: string;

  @ApiProperty({ example: 'crimial section' })
  readonly section: string;

  @ApiProperty({ example: '4ea40a83-d588-445c-a87b-623c232766ac' })
  readonly id: string;

  @ApiProperty({ example: '2023-08-16T20:24:46.337Z' })
  readonly created: string;

  @ApiProperty({ example: '2023-08-16T20:24:46.337Z' })
  readonly updated: string;
}
