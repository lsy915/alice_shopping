import { BaseTimeIdEntity } from "./BaseTimeIdEntity";
import { Entity, Column, OneToMany } from "typeorm";
import { Post } from "./Post.entity";
import { Order } from './Order.entity';
import { Delivery } from './Delivery.entity';

@Entity()
export class User extends BaseTimeIdEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email:string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
    default: 'male',
  })
  gender: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Post, (post) => post.user, { cascade: ['soft-remove', 'recover'],})
  posts: Post[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Delivery, (delivery) => delivery.user)
  deliveries: Delivery[];
}