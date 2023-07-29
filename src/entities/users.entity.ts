import { Entity, Column, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm"
import { BaseEntityModel } from "./base.entity.model"
import { CasesEntity } from "./cases.entity";
import { DepartmentsEntity } from "./departments.entity";
import { ImagesEntity } from "./images.entity";

@Entity('users')
export class UsersEntity extends BaseEntityModel {
    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    password: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true
    })
    identification_id: string;

    @ManyToMany(() => CasesEntity, (cases) => cases.users)
    @JoinTable({name: 'cases_users_table'})
    cases: CasesEntity[];

    @OneToOne(() => DepartmentsEntity)
    @JoinColumn({name: 'departament_id'})
    departament: DepartmentsEntity;

    @OneToOne(() => ImagesEntity, (image) => image.user)
    profile: UsersEntity;
}
