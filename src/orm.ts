require('dotenv').config();
import { ImageSubscriber } from "src/subscribers/image-subscriber";
import { CasesSubscriber } from "src/subscribers/cases-subscriber";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeormConfig : PostgresConnectionOptions = {
    type: 'postgres',
    url:  process.env.NEON_PG_URL,
    ssl: true,
    synchronize: process.env.NODE_ENV !== 'prod',
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    subscribers:[
      ImageSubscriber,
      CasesSubscriber,
    ],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    logging: false
}

//process.env.NODE_ENV !== 'prod',