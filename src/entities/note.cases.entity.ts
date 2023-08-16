import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CasesEntity } from './cases.entity';
import { BaseEntityModel } from './base.entity.model';

@Entity('notes')
export class NoteCaseEntity extends BaseEntityModel {
  @Column()
  text_note: string;

  @ManyToOne(() => CasesEntity, (cases) => cases.note, {
    nullable: true,
  })
  @JoinColumn({ name: 'case_id' })
  cases: CasesEntity;
}
