import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from 'src/notes/dto/create.note.dto';
import { CasesService } from 'src/cases/cases.service';
import { NoteCaseEntity } from 'src/entities/note.cases.entity';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { currentUser } from 'src/user.guard/user.guard';
import { ResponseCreateNoteDto } from './dto/response.create.note.dto';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(
    private NotesService: NotesService,
    private casesService: CasesService,
  ) {}

  @Post()
  @UseGuards(currentUser)
  @ApiOperation({ summary: 'Create a note' })
  @ApiOkResponse({ type: ResponseCreateNoteDto })
  async createNote(@Body() dto: CreateNoteDto): Promise<NoteCaseEntity> {
    const cases = await this.casesService.getImageCasesById(dto.caseId);
    return await this.NotesService.createNote(dto, cases);
  }

  @Put('/:id')
  @UseGuards(currentUser)
  @ApiOperation({ summary: 'Edit a note' })
  @ApiOkResponse({ type: ResponseCreateNoteDto })
  async editeNote(
    @Body() dto: CreateNoteDto,
    @Param('id') id: string,
  ): Promise<NoteCaseEntity> {
    return await this.NotesService.editNote(dto, id);
  }
}
