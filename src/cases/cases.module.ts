import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasesEntity } from 'src/entities/cases.entity';
import { CasesController } from './cases.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([CasesEntity]),
  ],
  providers: [CasesService],
  controllers:[CasesController]
})
export class CasesModule {}
