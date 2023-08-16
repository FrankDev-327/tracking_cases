import { Module } from '@nestjs/common';
import { CloudinayService } from './cloudinay.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinayService, CloudinaryProvider],
  exports: [CloudinayService, CloudinaryProvider],
})
export class CloudinayModule {}
