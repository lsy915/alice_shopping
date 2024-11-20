import { CreateDateColumn, DeleteDateColumn, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseTimeIdEntity {
  @Generated('increment')
  @PrimaryColumn()
  id: number;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime' })
  deletedAt: Date | null;
}
