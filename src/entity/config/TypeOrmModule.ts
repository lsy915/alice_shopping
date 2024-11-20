import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as path from 'path';
import { User } from "../User.entity";
import { Post } from "../Post.entity";
import { Profile } from "../Profile.entity";
import { EmailVerification } from "../Email.Verification.entity";
import { Size } from "../Size.entity";

export function getTypeOrmModule() {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: configService.get<number>('DB_PORT', 3306), //postgres = 5432
      username: configService.get<string>('DB_USERNAME', 'root'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME', 'data1'),
      entities: [path.join(__dirname, '..', '**/*.entity.{js,ts'), User, Post, Profile, EmailVerification, Size],
      logging: true,
      synchronize: true,
    })
  })
}