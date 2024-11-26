import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Delivery } from "@root/entity/Delivery.entity";
import { Order } from "@root/entity/Order.entity";
import { OrderItem } from "@root/entity/OrderItem.entity";
import { Post } from "@root/entity/Post.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create.order.dto";

@Injectable()
export class OrderProvider {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createOrder(dto: CreateOrderDto, userId: number) {
    const delivery = await this.deliveryRepository.findOne({ where: { id: dto.deliveryId, user: { id: userId } }});
    if(!delivery) {
      throw new NotFoundException('배송지를 찾을 수 없습니다.');
    }

    let totalPrice = 0;
    const orderItems = await Promise.all(
      dto.products.map(async (product) => {
        const post = await this.postRepository.findOne({ where: { id: product.postId } });
        if(!post) {
          throw new NotFoundException('상품을 찾을 수 없습니다.');
        }
        const totalItemPrice = post.price * product.quantity;
        totalPrice += totalItemPrice;

        const orderItem = this.orderItemRepository.create({
          product: post,
          quantity: product.quantity,
          price: post.price,
          totalPrice: totalItemPrice,
        });
        return orderItem;
      }),
    );

    const order = this.orderRepository.create({
      user: { id: userId },
      delivery,
      items: orderItems,
      totalPrice,
    });
    return this.orderRepository.save(order);
  }
}