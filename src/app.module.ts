import { Module } from '@nestjs/common';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { ConfigModule } from '@nestjs/config';
import { getTypeOrmModule } from './entity/config/TypeOrmModule';
import { EntityModule } from './entity/config/EntityModule';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostModule,
    AuthModule,
    getTypeOrmModule(),
    EntityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
