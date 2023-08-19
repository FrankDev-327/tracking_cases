import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateImageDto {
  @ApiProperty({ example: '18e9ea5f-fdab-4e20-9295-9a57d8f97d18' })
  readonly id: string;

  @ApiProperty({ example: '2023-08-16T11:10:06.949Z' })
  readonly created: string;

  @ApiProperty({ example: '2023-08-16T11:10:09.487Z' })
  readonly updated: string;

  @ApiProperty({ example: 'Screenshot from 2023-08-10 17-19-08' })
  readonly name_file: string;

  @ApiProperty({ example: '.png' })
  readonly ext_file: string;

  @ApiProperty({
    example:
      'http://res.cloudinary.com/trackingcloud/image/upload/v1692191408/9ace4524-db36-4c2d-a0ef-d43da592f912/gqzk5ysrzdjynmreolvr.png',
  })
  readonly url: string;

  @ApiProperty({
    example: '9ace4524-db36-4c2d-a0ef-d43da592f912/gqzk5ysrzdjynmreolvr',
  })
  readonly public_img_id: string;

  @ApiProperty({ example: 644260 })
  readonly size_file: number;
}
