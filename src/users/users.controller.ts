import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersEntity } from 'src/entities/users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

    @Post()
    async createUser(@Body() userDto: CreateUserDto): Promise<UsersEntity> {
        return await this.usersService.createUser(userDto);
    }

    @Get('/info')
    async getUserInfo(): Promise<UsersEntity> {
        return await this.usersService.getUserInfo('');
    }
}
