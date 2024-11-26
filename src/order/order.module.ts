import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@root/entity/order.entity';
import { OrderItem } from '@root/entity/orderItem.entity';
import { Delivery } from '@root/entity/delivery.entity';
import { Post } from '@root/entity/post.entity';
import { User } from '@root/entity/user.entity';
import { OrderProvider } from './order.provider';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Delivery, Post, User]), // 엔티티 등록
  ],
  controllers: [OrderController],
  providers: [OrderProvider],
})
export class OrderModule {}