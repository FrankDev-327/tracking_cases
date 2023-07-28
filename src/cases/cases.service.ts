import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CasesEntity } from 'src/entities/cases.entity';
import { CreateCaseDto } from './dto/create.case.dto';
import { UsersEntity } from 'src/entities/users.entity';

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

    async createCase(dto: CreateCaseDto): Promise<CasesEntity> {
        const cases = this.casesRepository.create(dto);
        return await this.casesRepository.save(cases);
    }

    async getImageCasesById(id: string): Promise<CasesEntity> {
        return await this.casesRepository.findOne({
            where: {id},
            relations: ['image','note']
        });
    }

    async assignCaseToUser(id:string, user: string): Promise<CasesEntity> {
        const cases = await this.getImageCasesById(id);


        return 
    }
}
