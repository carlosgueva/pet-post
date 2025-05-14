import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PetPostStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class PetPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 60,
    nullable: false,
  })
  petname: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  image_url: string;

  @Column('enum', {
    enum: PetPostStatus,
    default: PetPostStatus.PENDING,
  })
  status: PetPostStatus;

  @Column('boolean', {
    nullable: false,
    default: false,
  })
  hasfound: boolean;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createt_at: Date;
}
