import { BaseTimeIdEntity } from "./BaseTimeIdEntity";
import { User } from "./User.entity";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Profile extends BaseTimeIdEntity {
  @Column()
  avatarUrl: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}