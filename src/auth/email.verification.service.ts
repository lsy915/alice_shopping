import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailVerification } from '@root/entity/Email.Verification.entity';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepository: Repository<EmailVerification>,
  ) {}

  async sendVerificationEmail(email: string): Promise<void> {
    const code = randomBytes(3).toString('hex').toUpperCase(); // 랜덤 인증 코드 생성
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 3); // 3분 후 만료

    // 데이터베이스에 저장
    const emailVerification = this.emailVerificationRepository.create({
      email,
      code,
      expiresAt,
    });
    await this.emailVerificationRepository.save(emailVerification);

    // 이메일 전송
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '이메일 인증 요청',
      text: `이메일 인증 코드: ${code}`,
    });

    console.log(`인증 이메일이 ${email}로 전송되었습니다. 코드: ${code}`);
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const record = await this.emailVerificationRepository.findOne({
      where: { email, code },
    });

    if (!record) {
      throw new Error('인증 코드가 유효하지 않습니다.');
    }

    if (record.expiresAt < new Date()) {
      throw new Error('인증 코드가 만료되었습니다.');
    }

    // 인증 성공 시 데이터 삭제
    await this.emailVerificationRepository.delete(record.id);

    return true;
  }
}