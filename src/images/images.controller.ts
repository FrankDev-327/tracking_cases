import { Controller, Get, Param, UploadedFiles, UploadedFile, UseInterceptors, Post, Body, NotFoundException,  } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesEntity } from 'src/entities/images.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CasesService } from 'src/cases/cases.service';
import { CloudinayService } from 'src/cloudinay/cloudinay.service';

@Controller('images')
export class ImagesController {
    constructor(
        private imagesService:ImagesService,
        private casesService:CasesService,
        private cloudinayService:CloudinayService,
    ){}

    @Post()
    @UseInterceptors(FilesInterceptor('files', 4, {}))
    async createImage(
        @Body('casesId') casesId: string,
        @UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<ImagesEntity[]> {
        const caseInfo = await this.casesService.getImageCasesById(casesId);
        return await this.imagesService.createImage(
            files,
            caseInfo
        );
    }

    @Get('/:id')
    async getImageById(@Param('id') id: string): Promise<ImagesEntity> {
        const image = await this.imagesService.getImageById(id);
        if(image) throw new NotFoundException('This image does not exist in your records.');

        const imgExist = await this.cloudinayService.getFileInfoByPublicId(image.public_img_id);
        if(imgExist) throw new NotFoundException('This image does not exist in your providers');

        return image;
    }
}
