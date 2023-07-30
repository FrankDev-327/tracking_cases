import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create.case.dto';
import { CasesEntity } from 'src/entities/cases.entity';
import { RedisService } from 'src/redis/redis.service';
import { currentUser } from 'src/user.guard/user.guard';

@Controller('cases')
export class CasesController {
    constructor(
        private redisService:RedisService,
        private casesService:CasesService,
    ){}

    @Post('/create')
    @UseGuards(currentUser)
    async createCase(@Body() dto:CreateCaseDto): Promise<CasesEntity> { 
        return await this.casesService.createCase(dto);
    }

    @Get('/:id')
    @UseGuards(currentUser)
    async getImageCasesById(@Param('id') id: string): Promise<CasesEntity> {
        let data;
        const expKey = await this.redisService.checkExpRedisKey(id);
        if(expKey <= 0) {
            data = await this.casesService.getImageCasesById(id);
            await this.redisService.setRedis(id, data);
        } else {
            data = await this.redisService.getRedis(id);
        }

        return data;
    }
}
