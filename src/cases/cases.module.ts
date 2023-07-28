import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';

@Module({
  providers: [CasesService]
})
export class CasesModule {}
