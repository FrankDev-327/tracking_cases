import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersEntity } from 'src/entities/users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UserLogged } from 'src/decorators/user.auth.decorator';
import { currentUser } from 'src/user.guard/user.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/respose.user.dto';
import { ResponseUserCasesDto } from './dto/response.user.cases.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  //@UseGuards(currentUser)
  @ApiOperation({ summary: 'Create a user' })
  @ApiOkResponse({ type: ResponseUserDto })
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
  @ApiOperation({ summary: 'Get cases related to a user' })
  @ApiOkResponse({ type: ResponseUserCasesDto })
  async getUserAssignedCases(
    @UserLogged() currentUser,
  ): Promise<UsersEntity[]> {
    return await this.usersService.getUserAssignedCases(currentUser.id);
  }
}
