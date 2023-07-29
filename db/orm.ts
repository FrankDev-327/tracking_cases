require('dotenv').config();
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeormConfig : PostgresConnectionOptions = {
    type: 'postgres',
    url:  process.env.NEON_PG_URL,
    ssl: true,
    synchronize: process.env.NODE_ENV !== 'prod',
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    logging: false
}

//process.env.NODE_ENV !== 'prod',