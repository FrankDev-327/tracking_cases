import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { CasesEntity } from 'src/entities/cases.entity';
import { UsersService } from 'src/users/users.service';

@EventSubscriber()
export class CasesSubscriber implements EntitySubscriberInterface<CasesEntity> {
  constructor(private usersService: UsersService) {}

  listenTo(): string | Function {
    return CasesEntity;
  }

  async afterInsert(event: InsertEvent<CasesEntity>): Promise<void> {}
}
