import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create.orderItem.dto';

export class CreateOrderDto {
  @ApiProperty({ description: '배송지 ID', example: 1 })
  @IsNumber()
  deliveryId: number;

  @ApiProperty({
    description: '주문 상품 리스트',
    example: [
      { postId: 1, quantity: 2 },
      { postId: 2, quantity: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  products: CreateOrderItemDto[];
}