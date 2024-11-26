import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    description: '이름',
    example: 'test',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '이메일',
    example: 'test@test.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'Testpassword1!',
    required: true,
  })
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;

  @ApiProperty({
    description: '성별',
    example: 'male',
    required: true,
  })
  @IsString()
  gender: string;
}