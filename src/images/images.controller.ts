import {
  Controller,
  Get,
  Param,
  UploadedFiles,
  UploadedFile,
  UseInterceptors,
  Post,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CasesService } from '../cases/cases.service';
import { ImagesEntity } from '../entities/images.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinayService } from '../cloudinay/cloudinay.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { currentUser } from '../user.guard/user.guard';
import { ResponseCreateImageDto } from './dto/response.create.image.dto';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(
    private imagesService: ImagesService,
    private casesService: CasesService,
    private cloudinayService: CloudinayService,
  ) {}

  @Post()
  @UseGuards(currentUser)
  @ApiOperation({ summary: 'Create a image' })
  @ApiOkResponse({ type: [ResponseCreateImageDto] })
  @UseInterceptors(FilesInterceptor('files', 4, {}))
  async createImage(
    @Body('casesId') casesId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<ImagesEntity[]> {
    const caseInfo = await this.casesService.getImageCasesById(casesId);
    return await this.imagesService.createImage(files, caseInfo);
  }

  @Get('/:id')
  async getImageById(@Param('id') id: string): Promise<ImagesEntity> {
    const image = await this.imagesService.getImageById(id);
    if (image)
      throw new NotFoundException('This image does not exist in your records.');

    const imgExist = await this.cloudinayService.getFileInfoByPublicId(
      image.public_img_id,
    );
    if (imgExist)
      throw new NotFoundException(
        'This image does not exist in your providers',
      );

    return image;
  }
}
