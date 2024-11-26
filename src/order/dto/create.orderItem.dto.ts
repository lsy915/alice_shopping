import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: '상품 ID', example: 1 })
  @IsNumber()
  postId: number;

  @ApiProperty({ description: '주문 수량', example: 2 })
  @IsNumber()
  quantity: number;
}