import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({
    description: '메뉴 이름',
    example: '메뉴',
  })
  @IsString()
  name: string;
}