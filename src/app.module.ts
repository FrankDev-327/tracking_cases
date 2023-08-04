import { Module, Scope } from '@nestjs/common';
import {typeormConfig} from './orm'
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { UsersModule } from './users/users.module';
import { CasesModule } from './cases/cases.module';
import { ImagesModule } from './images/images.module';
import { DepartamentsModule } from './departaments/departaments.module';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinayModule } from './cloudinay/cloudinay.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeormConfig),
    DocumentsModule, 
    UsersModule, 
    CasesModule, 
    ImagesModule, 
    DepartamentsModule, 
    NotesModule, 
    CloudinayModule, 
    RedisModule, 
    AuthModule, 
  ],
})
export class AppModule {}
