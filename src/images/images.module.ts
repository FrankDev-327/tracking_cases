import { Module } from '@nestjs/common';
import { CloudinayModule } from 'src/cloudinay/cloudinay.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasesModule } from 'src/cases/cases.module';
import { ImagesService } from './images.service';
import { ImagesEntity } from 'src/entities/images.entity';
import { ImagesController } from './images.controller';

@Module({
  imports: [
    CasesModule,
    CloudinayModule,
    TypeOrmModule.forFeature([ImagesEntity]),
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
