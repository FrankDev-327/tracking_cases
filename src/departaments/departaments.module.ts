import { Module } from '@nestjs/common';
import { DocumentsModule } from 'src/documents/documents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsEntity } from 'src/entities/departments.entity';
import { UsersModule } from 'src/users/users.module';
import { DepartamentsService } from './departaments.service';
import { DepartamentsController } from './departaments.controller';

@Module({
  imports: [
    UsersModule,
    DocumentsModule,
    TypeOrmModule.forFeature([DepartmentsEntity]),
  ],
  providers: [DepartamentsService],
  controllers: [DepartamentsController],
})
export class DepartamentsModule {}
