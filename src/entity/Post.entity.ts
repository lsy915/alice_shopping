import { BaseTimeIdEntity } from "./BaseTimeIdEntity";
import { Size } from "./Size.entity";
import { User } from "./User.entity";
import { Menu } from './Menu.entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";

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

  @Column({ default: 0 })
  view: number;

  @ManyToOne(() => Menu, (menu) => menu.posts, { onDelete: 'SET NULL' })
  menu: Menu;

  @ManyToMany(() => Size, (size) => size.posts, { cascade: true })
  @JoinTable()
  size: Size[];
  
  @ManyToMany(() => User, (user) => user.posts)
  user: User;
}