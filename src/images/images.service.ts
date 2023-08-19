import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DocumentsEntity } from 'src/entities/documents.entity';
import { ImagesEntity } from 'src/entities/images.entity';
import { CreateImageDto } from './dto/create.image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CasesEntity } from 'src/entities/cases.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { CasesService } from 'src/cases/cases.service';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { CloudinayService } from 'src/cloudinay/cloudinay.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ImagesService extends Repository<ImagesEntity> {
  constructor(
    @InjectRepository(ImagesEntity)
    private imageRepository: Repository<ImagesEntity>,
    private casesService: CasesService,
    private readonly amqpConnection: AmqpConnection,
    private cloudyService: CloudinayService,
  ) {
    super(
      imageRepository.target,
      imageRepository.manager,
      imageRepository.queryRunner,
    );
  }

  async createImage(
    files: Array<Express.Multer.File>,
    cases: CasesEntity,
  ): Promise<ImagesEntity[]> {
    let images: ImagesEntity[] = [];
    images = await Promise.all(
      files?.map(async (file: Express.Multer.File): Promise<ImagesEntity> => {
        let imgObj = {
          name_file: file.originalname.split('.')[0],
          ext_file: await this.getFileExtention(file),
          size_file: file.size,
        };

        const imageCreated: ImagesEntity = this.imageRepository.create(imgObj);
        imageCreated.cases = cases;
        const imageSaved = await this.imageRepository.save(imageCreated);

        const imgUploaed: UploadApiResponse | UploadApiErrorResponse =
          await this.cloudyService.uploadSingleImage(cases.id, file);

        Object.assign(imageSaved, {
          public_img_id: imgUploaed.public_id,
          url: imgUploaed.url,
        });

        return await this.updateImage(imageSaved);
      }),
    );

    const caseToSend = await this.casesService.getImageCasesById(cases.id);
    await this.amqpConnection.publish(
      'cases.relation',
      'cases-relation-route',
      {
        ...caseToSend,
      },
    );

    return images;
  }

  async createProfileImage(
    file: Express.Multer.File,
    user: UsersEntity,
  ): Promise<ImagesEntity> {
    let imgObj = {
      name_file: file[0].originalname.split('.')[0],
      ext_file: await this.getFileExtention(file[0]),
      size_file: file[0].size,
    };

    const imageCreated: ImagesEntity = this.imageRepository.create(imgObj);
    const imageSavd = await this.imageRepository.save(imageCreated);

    const imageUploaded: UploadApiResponse | UploadApiErrorResponse =
      await this.cloudyService.uploadSingleImage(user.id, file);

    Object.assign(imageSavd, {
      profile: user,
      public_img_id: imageUploaded.public_id,
      url: imageUploaded.url,
    });

    return await this.updateImage(imageSavd);
  }

  async storingDocument(
    file: Express.Multer.File,
    document: DocumentsEntity,
  ): Promise<ImagesEntity> {
    const imgObj = {
      name_file: file[0].originalname.split('.')[0],
      ext_file: await this.getFileExtention(file[0]),
      size_file: file[0].size,
    };

    const imageCreated: ImagesEntity = this.imageRepository.create(imgObj);
    const imageSavd = await this.imageRepository.save(imageCreated);

    const imageUploaded: UploadApiResponse | UploadApiErrorResponse =
      await this.cloudyService.uploadSingleImage(document.id, file);

    Object.assign(imageSavd, {
      public_img_id: imageUploaded.public_id,
      url: imageUploaded.url,
    });

    return await this.updateImage(imageSavd);
  }

  async getImageById(id: string): Promise<ImagesEntity> {
    return await this.imageRepository.findOne({
      where: { id },
    });
  }

  async updateImage(
    imageDto: CreateImageDto | ImagesEntity,
  ): Promise<ImagesEntity> {
    return await this.imageRepository.save({ id: imageDto.id, ...imageDto });
  }

  async deleteImage(id: string | Array<string>): Promise<ImagesEntity | any> {
    if (Array.isArray(id)) {
      return await this.imageRepository.delete(id);
    }

    const image: ImagesEntity = await this.getImageById(id);
    if (!image) throw new NotFoundException('This value does not exist.');

    const imageDeleted = await this.imageRepository.delete(image.id);
    if (imageDeleted.affected > 0) {
      await this.cloudyService.deleteSingleImage(image.public_img_id);
    }

    return;
  }

  async deleteManyImages(
    ids: Array<string>,
    img_pbls_ids: Array<string>,
  ): Promise<any> {
    const imagesDeletes = await this.deleteImage(ids);
    if (imagesDeletes.affected > 0) {
      await this.cloudyService.deleteMultipleImages(img_pbls_ids);
    }
    return;
  }

  async getFileExtention(file: Express.Multer.File): Promise<string> {
    return file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
  }
}
