import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../Post.entity";
import { Profile } from "../Profile.entity";
import { User } from "../User.entity";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Profile])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class EntityModule {}