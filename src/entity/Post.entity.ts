import { BaseTimeIdEntity } from "./BaseTimeIdEntity";
import { Size } from "./Size.entity";
import { User } from "./User.entity";
import { Entity, Column, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Post extends BaseTimeIdEntity {
  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  price: number;

  @Column()
  imgurl: string;

  @ManyToMany(() => Size, (size) => size.posts, { cascade: true })
  @JoinTable()
  size: Size[];
  
  @ManyToMany(() => User, (user) => user.posts)
  user: User;
}