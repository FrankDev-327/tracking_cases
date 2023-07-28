import { Entity, Column, OneToMany } from "typeorm"
import { BaseEntityModel } from "./base.entity.model"

@Entity('users')
export class Users extends BaseEntityModel {
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
}
