import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasesEntity } from 'src/entities/cases.entity';
import { UsersModule } from 'src/users/users.module';
import { CasesController } from './cases.controller';

@Module({
  imports:[
    UsersModule,
    TypeOrmModule.forFeature([CasesEntity]),
  ],
  providers: [CasesService],
  controllers:[CasesController]
})
export class CasesModule {}
