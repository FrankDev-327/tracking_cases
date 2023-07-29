import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create.case.dto';
import { CasesEntity } from 'src/entities/cases.entity';
import { RedisService } from 'src/redis/redis.service';
@Controller('cases')
export class CasesController {
    constructor(
        private redisService:RedisService,
        private casesService:CasesService,
    ){}

    @Post()
    async createCase(@Body() dto:CreateCaseDto): Promise<CasesEntity> {
        return await this.casesService.createCase(dto);
    }

    @Get('/:id')
    async getImageCasesById(@Param('id') id: string): Promise<CasesEntity> {
        let data;
        const timerRedis = await this.redisService.checkExpRedisKey(id);
        if(timerRedis <= 0) {
            data = await this.casesService.getImageCasesById(id);
            await this.redisService.setRedis(id, data);
        } else {
            data = await this.redisService.getRedis(id);
        }
        return data;
    }
}
