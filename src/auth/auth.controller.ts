import { Body, Controller, Post } from "@nestjs/common";
import { AuthProvider } from "./auth.provider";
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { RegisterSuccess } from "./docs/RegistorDocs";
import { RegisterDto } from "./dto/register.dto";
import { LoginFail, LoginSuccess } from "./docs/LoginDocs";
import { LoginDto } from "./dto/login.dto";
import { EmailVerificationService } from "./email.verification.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authProvider: AuthProvider, private readonly emailVerificationService: EmailVerificationService) {}

  @ApiTags('Auth')
  @ApiOperation({
    summary: '이메일인증 발송 API',
    description: '이메일인증 발송 API입니다.',
  })
  @Post('sendemail')
  async sendVerificationEmail(@Body('email') email: string) {
    await this.authProvider.findEmail(email);
    await this.emailVerificationService.sendVerificationEmail(email);
    return { message: '인증 이메일이 전송되었습니다.'};
  }

  @ApiTags('Auth')
  @ApiOperation({
    summary: '이메일인증 API',
    description: '이메일인증 API입니다. True 시 이메일 입력칸 잠굼',
  })
  @Post('verifyemail')
  async verifyEmail(@Body('email') email: string, @Body('code') code: string) {
    const isVerified = await this.emailVerificationService.verifyCode(email, code);
    return { verified: isVerified };
  }


  @ApiTags('Auth')
  @ApiOperation({
    summary: '회원가입 API',
    description: '회원가입 API입니다.',
  })
  @ApiCreatedResponse({
    description: 'API 호출에 성공했습니다.',
    type: RegisterSuccess,
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authProvider.register(registerDto)
  }

  @ApiTags('Auth')
  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 API입니다.',
  })
  @ApiCreatedResponse({
    description: 'API 호출에 성공했습니다.',
    type: LoginSuccess,
  })
  @ApiUnauthorizedResponse({
    description: '유효하지 않은 사용자입니다.',
    type: LoginFail,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authProvider.login(loginDto);
  }
}
