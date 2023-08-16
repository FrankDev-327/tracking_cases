import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';

@Injectable()
export class UsersService extends Repository<UsersEntity> {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async createUser(dto: CreateUserDto): Promise<UsersEntity> {
    const userCreatd = this.userRepository.create(dto);
    return await this.userRepository.save(userCreatd);
  }

  async getUserInfo(id: string): Promise<UsersEntity> {
    const user = await this.userRepository.findOneBy({ id: id });
    delete user.password;
    return user;
  }

  async getUserAssignedCases(id: string): Promise<UsersEntity[]> {
    return await this.userRepository.find({
      where: { id: id },
      relations: ['cases'],
    });
  }
}
