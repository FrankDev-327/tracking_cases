import { Module } from '@nestjs/common';
import { TesseractService } from './tesseract.service';

@Module({
  exports: [TesseractService],
  providers: [TesseractService],
})
export class TesseractModule {}
