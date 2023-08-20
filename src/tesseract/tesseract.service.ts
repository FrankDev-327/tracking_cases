import { Injectable } from '@nestjs/common';
import * as tesseract from 'node-tesseract-ocr';
const fullFilePath = __dirname+'/utilstempFile.pdf';

@Injectable()
export class TesseractService {
  constructor() {}

  private config = {
    lang: 'eng',
    oem: 1,
    psm: 3,
    presets: ['pdf'],
  };

  async generateOCR(): Promise<any> {
    return tesseract
      .recognize(fullFilePath, this.config)
      .then((text) => {
        //console.log('Result:', text);
        return text;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
