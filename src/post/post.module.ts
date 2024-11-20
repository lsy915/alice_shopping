import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PostController } from "./post.controller";
import { PostProvider } from "./post.provider";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Size } from "@root/entity/Size.entity";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([Size]),
  ],
  controllers: [PostController],
  providers: [PostProvider]
})

export class PostModule {}