import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteCaseEntity } from 'src/entities/note.cases.entity';
import { CasesModule } from 'src/cases/cases.module';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  imports: [CasesModule, TypeOrmModule.forFeature([NoteCaseEntity])],
  providers: [NotesService],
  controllers: [NotesController],
  exports: [NotesService],
})
export class NotesModule {}
