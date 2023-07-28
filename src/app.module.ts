import { Module } from '@nestjs/common';
import { DocumentsController } from './documents/documents.controller';
import { ServiceController } from './service/service.controller';
import { ModuleController } from './module/module.controller';
import { DocumentsService } from './documents/documents.service';
import { DocumentsModule } from './documents/documents.module';
import { UsersModule } from './users/users.module';
import { CasesController } from './cases/cases.controller';
import { CasesModule } from './cases/cases.module';
import { ImagesService } from './images/images.service';
import { ImagesModule } from './images/images.module';
import { DepartamentsModule } from './departaments/departaments.module';
import { NotesService } from './notes/notes.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [DocumentsModule, UsersModule, CasesModule, ImagesModule, DepartamentsModule, NotesModule],
  controllers: [DocumentsController, ServiceController, ModuleController, CasesController],
  providers: [DocumentsService, ImagesService, NotesService],
})
export class AppModule {}
