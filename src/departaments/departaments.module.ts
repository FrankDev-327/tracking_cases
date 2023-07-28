import { Module } from '@nestjs/common';
import { DepartamentsService } from './departaments.service';
import { DepartamentsController } from './departaments.controller';

@Module({
  providers: [DepartamentsService],
  controllers: [DepartamentsController]
})
export class DepartamentsModule {}
