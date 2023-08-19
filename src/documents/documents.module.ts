import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsService } from './documents.service';
import { DocumentsEntity } from 'src/entities/documents.entity';
import { TesseractModule } from 'src/tesseract/tesseract.module';
import { ImagesModule } from 'src/images/images.module';
import { DocumentsController } from './documents.controller';

@Module({
  imports: [
    TesseractModule,
    ImagesModule,
    TypeOrmModule.forFeature([DocumentsEntity]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
