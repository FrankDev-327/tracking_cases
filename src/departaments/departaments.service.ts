import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartamentDto } from './dto/create.departament.dto';
import { DepartmentsEntity } from 'src/entities/departments.entity';

@Injectable()
export class DepartamentsService extends Repository<DepartmentsEntity> {
  constructor(
    private usersService: UsersService,
    @InjectRepository(DepartmentsEntity)
    private departamentRepository: Repository<DepartmentsEntity>,
  ) {
    super(
      departamentRepository.target,
      departamentRepository.manager,
      departamentRepository.queryRunner,
    );
  }

  async createDepartament(
    dto: CreateDepartamentDto,
  ): Promise<DepartmentsEntity> {
    const user = await this.usersService.getUserInfo(dto.userId);
    const departamentCreated = this.departamentRepository.create(dto);
    const departamentSaved = await this.departamentRepository.save(
      departamentCreated,
    );

    user.departament = departamentSaved;
    await user.save();
    return departamentSaved;
  }
}
