import { Column, Entity, JoinColumn, OneToMany } from "typeorm"
import { BaseEntityModel } from "./base.entity.model";
import { ImagesEntity } from "./images.entity";
import { NoteCaseEntity } from "./note.cases.entity";

@Entity('cases')
export class CasesEntity extends BaseEntityModel {
    @Column()
    name_case: string;

    @Column()
    description_case: string;

    @Column({
        default: false
    })
    state: boolean;

    @OneToMany(() => ImagesEntity, (image) => image.cases)
    @JoinColumn({ name: 'image_id' })
    image: ImagesEntity[];

    @OneToMany(() => NoteCaseEntity, (note) => note.cases)
    @JoinColumn({ name: 'note_case_id' })
    note: NoteCaseEntity[];
}
