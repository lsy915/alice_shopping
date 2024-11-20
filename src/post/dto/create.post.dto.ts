import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
  @ApiProperty({
    description: '제목',
    example: '',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '내용',
    example: 'test',
    required: true,
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: '가격',
    example: '14999',
    required: true,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: '상품 이미지',
    example: 'https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/e5e1/9c1724a104ebff4a9e4df0cdb702896bbc5f60cd5e482d425641730e1af8.jpg',
    required: true,
  })
  @IsString()
  imgurl: string;

  @ApiProperty({
    description: '사이즈',
    example: [95, 100, 105],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  size: number;
}