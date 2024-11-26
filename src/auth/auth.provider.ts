import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { User } from "@root/entity/User.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email, deletedAt: null });
    if(!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('유효하지 않은 사용자 입니다.')
    }

    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);
    return { message: '로그인 성공', accessToken: token }
  }

  async findEmail(email: string) {
    const isEmail = await this.userRepository.findOneBy({ email, deletedAt: null });
    if(isEmail) {
      throw new BadRequestException('이미 사용중인 이메일 입니다.')
    }
  }

  async register(registerDto: RegisterDto) {
    const { name, email, password, gender } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.gender = gender;
    await this.userRepository.save(user);
    return { message: '회원가입 성공 '}
  }
}