import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsEntity } from 'src/entities/documents.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateDocumentDto } from './dto/create.document.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async storingTextDocumet(
    @Body('name_document') nameDocument: string,
    @UploadedFiles() files: Express.Multer.File,
  ): Promise<DocumentsEntity> {
    return await this.documentsService.createDocument(nameDocument, files);
  }
}
