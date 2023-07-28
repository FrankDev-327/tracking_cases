import { Body, Controller, Post } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create.case.dto';
import { CasesEntity } from 'src/entities/cases.entity';
@Controller('cases')
export class CasesController {
    constructor(
        private casesService:CasesService,
    ){}

    @Post()
    async createCase(@Body() dto:CreateCaseDto): Promise<CasesEntity> {
        return await this.casesService.createCase(dto);
    }
}
