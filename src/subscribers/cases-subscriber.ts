import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm"
import { CasesEntity } from "src/entities/cases.entity";
import { UsersService } from "src/users/users.service";
import { UserLogged } from "src/decorators/user.auth.decorator";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@EventSubscriber()
@Injectable({ scope: Scope.REQUEST, durable: true })
export class CasesSubscriber implements EntitySubscriberInterface<CasesEntity> {
    constructor(
        @Inject(REQUEST) private request: Request,
        private usersService:UsersService
    ){
        
    }

    listenTo(): string | Function {
        return CasesEntity;
    }

    async afterInsert(event: InsertEvent<CasesEntity>):Promise<void> {
        console.log(this.request);
        const currentUser = UserLogged(null, { getHandler: () => {
            console.log(event.queryRunner);
            
            event.queryRunner?.data?.request.user
        } });
        
        
        /* const user = await this.usersService.getUserInfo(currentUser.id); */
    }
}
