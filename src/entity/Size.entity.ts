import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post.entity";

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  size: number;

  @ManyToMany(() => Post, (post) => post.size)
  posts: Post[];
}