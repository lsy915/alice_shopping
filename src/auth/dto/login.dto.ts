import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: '이메일', required: true,
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: '비밀번호', required: true,
  })
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}