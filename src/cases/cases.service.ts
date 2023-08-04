import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CasesEntity } from 'src/entities/cases.entity';
import { CreateCaseDto } from './dto/create.case.dto';
import { UsersEntity } from 'src/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CasesService extends Repository<CasesEntity> {
    constructor(
        @InjectRepository(CasesEntity)
        private casesRepository: Repository<CasesEntity>,
        private usersService:UsersService,
        ) {
        super(
            casesRepository.target,
            casesRepository.manager,
            casesRepository.queryRunner
        );
    }

    async createCase(dto: CreateCaseDto, currentUser): Promise<CasesEntity> {        
        const cases = this.casesRepository.create(dto);
        const user = await this.usersService.getUserInfo(currentUser.id);
        const casesSaved = await this.casesRepository.save(cases);

        user.cases = [casesSaved];
        await user.save();
        return casesSaved;
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
