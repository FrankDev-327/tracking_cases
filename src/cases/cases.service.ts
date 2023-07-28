import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CasesEntity } from 'src/entities/cases.entity';

@Injectable()
export class CasesService extends Repository<CasesEntity> {
    constructor(
        @InjectRepository(CasesEntity)
        private casesRepository: Repository<CasesEntity>
        ) {
        super(
            casesRepository.target,
            casesRepository.manager,
            casesRepository.queryRunner
        );
    }

    async create()
}
