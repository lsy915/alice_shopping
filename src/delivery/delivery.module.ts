import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from '@root/entity/delivery.entity';
import { User } from '@root/entity/user.entity';
import { DeliveryController } from './delivery.controller';
import { DeliveryProvider } from './delivery.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery, User]), // 배송지 관련 엔티티 등록
  ],
  controllers: [DeliveryController],
  providers: [DeliveryProvider],
})
export class DeliveryModule {}