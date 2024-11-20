import { BaseTimeIdEntity } from "./BaseTimeIdEntity";
import { Entity, Column, OneToMany } from "typeorm";
import { Post } from "./Post.entity";

@Entity()
export class User extends BaseTimeIdEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email:string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: ['soft-remove', 'recover'],})
  posts: Post[];
}