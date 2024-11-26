import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Delivery } from "@root/entity/Delivery.entity";
import { Repository } from "typeorm";
import { CreateDeliveryDto } from "./dto/create.delivery.dto";

@Injectable()
export class DeliveryProvider {
  constructor(@InjectRepository(Delivery)
  private readonly deliveryRepository: Repository<Delivery>) {}

  async createDelivery(dto: CreateDeliveryDto, userId: number) {
    const delivery = this.deliveryRepository.create({ ...dto, user: { id: userId } });
    return this.deliveryRepository.save(delivery);
  }

  async deleteDelivery(deliveryId: number, userId: number) {
    const delivery = await this.deliveryRepository.findOne({ where: { id: deliveryId, user: { id: userId } } });
    if (!delivery) {
      throw new Error('해당 배송지를 찾을 수 없습니다.');
    }
    return this.deliveryRepository.remove(delivery);
  }
}