import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from 'src/images/dto/create.note.dto';
import { CasesService } from 'src/cases/cases.service';
import { NoteCaseEntity } from 'src/entities/note.cases.entity';

@Controller('notes')
export class NotesController {
    constructor(
        private NotesService:NotesService,
        private casesService: CasesService
    ){}

    @Post()
    async createNote(@Body() dto: CreateNoteDto): Promise<NoteCaseEntity> {      
        const cases = await this.casesService.getImageCasesById(dto.caseId);
        return await this.NotesService.createNote(dto, cases);
    }

    @Put('/:id')
    async editeNote(@Body() dto: CreateNoteDto, @Param('id') id: string): Promise<NoteCaseEntity> {
        return await this.NotesService.editNote(dto, id);
    }
}
