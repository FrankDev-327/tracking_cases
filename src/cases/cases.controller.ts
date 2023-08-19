import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create.case.dto';
import { CasesEntity } from 'src/entities/cases.entity';
import { RedisService } from 'src/redis/redis.service';
import { currentUser } from 'src/user.guard/user.guard';
import { UserLogged } from 'src/decorators/user.auth.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseCreateCasesDto } from './dto/response.cases.dto';
import { ResponseDetailsCasesDto } from './dto/response.detail.cases.dto';
import { ResponseAssignCasesDto } from './dto/response.assign.cases.dto';

@ApiTags('Cases')
@Controller('cases')
export class CasesController {
  constructor(
    private redisService: RedisService,
    private casesService: CasesService,
  ) {}

  @Post('/create')
  @UseGuards(currentUser)
  @ApiOperation({ summary: 'Create a case' })
  @ApiOkResponse({ type: ResponseCreateCasesDto })
  async createCase(
    @UserLogged() currentUser,
    @Body() dto: CreateCaseDto,
  ): Promise<CasesEntity> {
    return await this.casesService.createCase(dto, currentUser);
  }

  @Get('/:id')
  @UseGuards(currentUser)
  @ApiOperation({ summary: 'Details case' })
  @ApiOkResponse({ type: ResponseDetailsCasesDto })
  async getImageCasesById(@Param('id') id: string): Promise<CasesEntity> {
    let data;
    const expKey = await this.redisService.checkExpRedisKey(id);
    if (expKey <= 0) {
      data = await this.casesService.getImageCasesById(id);
      await this.redisService.setRedis(id, data);
    } else {
      data = await this.redisService.getRedis(id);
    }

    return data;
  }

  @Put('/assign/:id')
  @UseGuards(currentUser)
  @ApiOperation({ summary: 'Assign case to user' })
  @ApiOkResponse({ type: ResponseAssignCasesDto })
  async assignCaseUser(
    @Param('id') id: string,
    @UserLogged() current,
  ): Promise<CasesEntity> {
    return await this.casesService.assignCaseToUser(id, current.id);
  }
}
