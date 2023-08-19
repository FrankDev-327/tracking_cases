import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { BaseEntityModel } from './base.entity.model';
import { CasesEntity } from './cases.entity';
import { DepartmentsEntity } from './departments.entity';
import { ImagesEntity } from './images.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UsersEntity extends BaseEntityModel {
  @Column()
  name: string;

  @Column()
  last_name: string;

  //TODO manipulation of the object before being inserted
  @BeforeInsert()
  async hashinPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  identification_id: string;

  @ManyToMany(() => CasesEntity, (cases) => cases.users, {
    cascade: false,
  })
  @JoinTable({ name: 'cases_users_table' })
  cases: CasesEntity[];

  @OneToOne(() => DepartmentsEntity, {
    cascade: false,
  })
  @JoinColumn({ name: 'departament_id' })
  departament: DepartmentsEntity;

  @OneToOne(() => ImagesEntity, (image) => image.user)
  profile: UsersEntity;
}
