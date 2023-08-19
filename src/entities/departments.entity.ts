import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UsersEntity } from './users.entity';
import { BaseEntityModel } from './base.entity.model';
import { DocumentsEntity } from './documents.entity';

@Entity('departaments')
export class DepartmentsEntity extends BaseEntityModel {
  @Column()
  name_departament: string;

  @Column()
  section: string;

  @OneToOne(() => UsersEntity)
  user: UsersEntity;

  @OneToMany(() => DocumentsEntity, (document) => document.departaments)
  @JoinColumn({ name: 'document_id' })
  document: DocumentsEntity[];
}
