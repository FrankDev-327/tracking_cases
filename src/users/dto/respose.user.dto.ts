import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ example: 'b0e54296-9716-45f5-aae6-014efc40f295' })
  readonly id: string;

  @ApiProperty({ example: '2023-07-29T19:24:35.313Z' })
  readonly created: string;

  @ApiProperty({ example: '2023-07-29T19:24:35.313Z' })
  readonly updated: string;

  @ApiProperty({ example: 'John Doe' })
  readonly name: string;

  @ApiProperty({ example: 'Smith' })
  readonly last_name: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  readonly email: string;

  @ApiProperty({ example: 'ABCD1234' })
  readonly identification_id: string;
}
