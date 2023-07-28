import { Column, Entity } from "typeorm"
import { BaseEntityModel } from "./base.entity.model";

@Entity('departaments')
export class Departments extends BaseEntityModel {
    @Column()
    name_departament: string;

    @Column()
    section: string;

}
