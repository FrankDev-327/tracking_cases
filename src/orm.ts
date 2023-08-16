import { UsersEntity } from './entities/users.entity';
import { CasesEntity } from './entities/cases.entity';
import { ImagesEntity } from './entities/images.entity';
import { DocumentsEntity } from './entities/documents.entity';
import { NoteCaseEntity } from './entities/note.cases.entity';
import { DepartmentsEntity } from './entities/departments.entity';
import { ImageSubscriber } from 'src/subscribers/image-subscriber';
import { CasesSubscriber } from 'src/subscribers/cases-subscriber';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const typeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.NEON_PG_URL,
  ssl: true,
  synchronize: process.env.NODE_ENV !== 'prod',
  entities: [
    CasesEntity,
    UsersEntity,
    NoteCaseEntity,
    DocumentsEntity,
    ImagesEntity,
    DepartmentsEntity
  ],
  subscribers: [ImageSubscriber, CasesSubscriber],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  logging: false,
};

//process.env.NODE_ENV !== 'prod',
