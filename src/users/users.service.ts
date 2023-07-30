import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';

@Injectable()
export class UsersService extends Repository<UsersEntity> {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>
    ){
        super(
            userRepository.target,
            userRepository.manager,
            userRepository.queryRunner 
        );
    }

    async createUser(dto: CreateUserDto): Promise<UsersEntity> {
        const userCreatd = this.userRepository.create(dto);
        return await this.userRepository.save(userCreatd);
    }

    async getUserInfo(id: string): Promise<UsersEntity> {
        return await this.userRepository.findOne({
            where: {id},
            relations:['profile']
        })
    }
}
