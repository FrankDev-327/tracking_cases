import { Injectable } from '@nestjs/common';
import { DocumentsEntity } from 'src/entities/documents.entity';
import { TesseractService } from 'src/tesseract/tesseract.service';
import { Repository } from 'typeorm';
import { storingTempFile, deletingTempFile, convertPDFToImage } from '../utils/helper';
import { CreateDocumentDto } from './dto/create.document.dto';
import { ImagesService } from 'src/images/images.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesEntity } from 'src/entities/images.entity';

@Injectable()
export class DocumentsService extends Repository<DocumentsEntity> {
  constructor(
    @InjectRepository(DocumentsEntity)
    private documentRepository: Repository<DocumentsEntity>,
    private imagesService: ImagesService,
    private tesseractService: TesseractService,
  ) {
    super(
      documentRepository.target,
      documentRepository.manager,
      documentRepository.queryRunner,
    );
  }

  async createDocument(
    dto: string,
    files: Express.Multer.File,
  ): Promise<DocumentsEntity> {
    const documentCreated = this.documentRepository.create({
      name_document: dto,
    });
    const documentSaved = await this.documentRepository.save(documentCreated);

    const documentStored = await this.imagesService.storingDocument(
      files,
      documentSaved,
    );

    await storingTempFile(files);
    /* const extractDocumentText = await this.tesseractService.generateOCR();*/
    //await deletingTempFile(); 
    await convertPDFToImage();

    return await this.updateDocuemtOCRText(
      documentSaved.id,
      documentStored,
      '',
    );
  }

  async updateDocuemtOCRText(
    docId: string,
    documentStored: ImagesEntity,
    extractDocumentText: string,
  ): Promise<DocumentsEntity> {
    await this.documentRepository.update(docId, {
      text_document: extractDocumentText,
      image: documentStored,
    });
    return await this.getDocumentDetails(docId);
  }

  async getDocumentDetails(id: string): Promise<DocumentsEntity> {
    return await this.documentRepository.findOneBy({ id });
  }
}
