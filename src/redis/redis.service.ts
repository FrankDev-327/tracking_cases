import { Injectable } from '@nestjs/common';
import { RedisPreCommnads } from 'src/redis-commands/redis.commands';

@Injectable()
export class RedisService {
    private redis = RedisPreCommnads.getRedisConnectionInstande();

    async setRedis(key:string, valueObject): Promise<string> {
        return await this.redis.set(key, JSON.stringify(valueObject), "EX", 10);
    }

    async getRedis(key:string): Promise<unknown> {
        const data = await this.redis.get(key);
        return JSON.parse(JSON.stringify(data));
    }

    async checkExpRedisKey(key: string): Promise<number> {
      return await this.redis.ttl(key);
    }
}
