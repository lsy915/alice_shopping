import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDeliveryDto {
  @ApiProperty({
    description: '배송지 주소',
    example: '경기도 고양시 일산동구 로로로로 123'
  })
  address: string;

  @ApiProperty({
    description: '수령인 이름',
    example: '홍길동'
  })
  @IsString()
  recipient: string;

  @ApiProperty({
    description: '연락처',
    example: '010-1234-5678'
  })
  @IsString()
  phone: string;
}