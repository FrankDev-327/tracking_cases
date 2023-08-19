import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DepartmentsEntity } from 'src/entities/departments.entity';
import { CreateDepartamentDto } from './dto/create.departament.dto';
import { DepartamentsService } from './departaments.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { currentUser } from 'src/user.guard/user.guard';
import { ResponseCreateDepartamentDto } from './dto/response.create.departament.dto';

@ApiTags('Departaments')
@Controller('departaments')
export class DepartamentsController {
  constructor(private departamentsService: DepartamentsService) {}

  @Post()
  @UseGuards(currentUser)
  @ApiOperation({ summary: 'Create a departament' })
  @ApiOkResponse({ type: ResponseCreateDepartamentDto })
  async createDepartament(
    @Body() dto: CreateDepartamentDto,
  ): Promise<DepartmentsEntity> {
    return await this.departamentsService.createDepartament(dto);
  }
}
