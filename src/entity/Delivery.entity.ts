import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.deliveries, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  address: string;

  @Column()
  recipient: string;

  @Column()
  phone: string;
}