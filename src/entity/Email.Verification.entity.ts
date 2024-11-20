import { BaseTimeIdEntity } from "./BaseTimeIdEntity";
import { Entity, Column } from "typeorm";


@Entity()
export class EmailVerification extends BaseTimeIdEntity {
  @Column()
  email:string;

  @Column()
  code: string;

  @Column({ type: 'datetime'})
  expiresAt: Date;
}