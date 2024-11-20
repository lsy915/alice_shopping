import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthProvider } from "./auth.provider";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailVerificationService } from "./email.verification.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailVerification } from "@root/entity/Email.Verification.entity";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([EmailVerification]),
  ],
  controllers: [AuthController],
  providers: [AuthProvider, EmailVerificationService],
})
export class AuthModule {}