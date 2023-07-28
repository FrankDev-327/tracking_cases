import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { CasesEntity } from "./cases.entity";
import { DepartmentsEntity } from "./departments.entity";
import { BaseEntityModel } from "./base.entity.model";

@Entity('documents')
export class DocumentsEntity extends BaseEntityModel{
    @Column()
    text_document:string;

    @Column()
    name_document:string;

    @ManyToOne(() => CasesEntity, (cases) => cases.document)
    @JoinColumn({name: 'case_id'})
    cases: CasesEntity;

    @ManyToOne(() => DepartmentsEntity, (departaments) => departaments.document)
    @JoinColumn({name: 'departament_id'})
    departaments: DepartmentsEntity;
}
