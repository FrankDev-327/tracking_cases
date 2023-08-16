import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersEntity } from 'src/entities/users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UserLogged } from 'src/decorators/user.auth.decorator';
import { currentUser } from 'src/user.guard/user.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<UsersEntity> {
    return await this.usersService.createUser(userDto);
  }

  @Get('/info')
  @UseGuards(currentUser)
  async getUserInfo(@UserLogged() currentUser): Promise<UsersEntity> {
    return await this.usersService.getUserInfo(currentUser.id);
  }

  @Get('cases')
  @UseGuards(currentUser)
  async getUserAssignedCases(
    @UserLogged() currentUser,
  ): Promise<UsersEntity[]> {
    return await this.usersService.getUserAssignedCases(currentUser.id);
  }
}
