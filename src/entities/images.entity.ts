import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { CasesEntity } from "./cases.entity";
import { BaseEntityModel } from "./base.entity.model";

@Entity('images')
export class ImagesEntity extends BaseEntityModel {
    @Column()
    name_file: string;
  
    @Column()
    ext_file: string;
  
    @Column({ nullable: true })
    url: string;
  
    @Column({ nullable: true })
    public_img_id: string;
  
    @Column()
    size_file: number;

    @ManyToOne(() => CasesEntity, (cases) => cases.image, {
        nullable: true,
    })
    @JoinColumn({ name: 'case_id' })
    cases: CasesEntity;
}
