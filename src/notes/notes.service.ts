import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateNoteDto } from 'src/notes/dto/create.note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CasesEntity } from 'src/entities/cases.entity';
import { NoteCaseEntity } from 'src/entities/note.cases.entity';

@Injectable()
export class NotesService extends Repository<NoteCaseEntity> {
  constructor(
    @InjectRepository(NoteCaseEntity)
    private noteRepository: Repository<NoteCaseEntity>,
  ) {
    super(
      noteRepository.target,
      noteRepository.manager,
      noteRepository.queryRunner,
    );
  }

  async createNote(
    dto: CreateNoteDto,
    cases: CasesEntity,
  ): Promise<NoteCaseEntity> {
    const noteCreated = this.noteRepository.create(dto);
    noteCreated.cases = cases;
    return await this.noteRepository.save(noteCreated);
  }

  async editNote(dto: CreateNoteDto, id: string): Promise<NoteCaseEntity> {
    await this.noteRepository.update(id, { text_note: dto.text_note });
    return await this.getDetails(id);
  }

  async getDetails(id: string): Promise<NoteCaseEntity> {
    return await this.noteRepository.findOneBy({ id });
  }
}
