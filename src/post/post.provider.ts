import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@root/entity/Post.entity";
import { User } from "@root/entity/User.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create.post.dto";
import { JwtPayload } from "@root/auth/decorator/auth.jwt.decorator";
import { Size } from "@root/entity/Size.entity";

@Injectable()
export class PostProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async create(dto: CreatePostDto, user: JwtPayload) {
    const { name, content, price, imgurl, size } = dto;

    const findUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!findUser) {
      throw new UnauthorizedException('유효하지 않은 사용자 입니다.');
    }

    if(!Array.isArray(size)) {
      throw new Error('사이즈는 배열임을 보장');
    }

    const sizes = await Promise.all(
      size.map(async (sizeValue) => {
        let size = await this.sizeRepository.findOne({ where: { size: sizeValue } });
        if(!size) {
          size = this.sizeRepository.create({ size: sizeValue });
          await this.sizeRepository.save(size);
        }
        return size;
      }),
    )

    const post = new Post();
    post.name = name;
    post.content = content;
    post.user = findUser;
    post.price = price;
    post.imgurl = imgurl;
    post.size = sizes;

    await this.postRepository.save(post);

    return { message: '상품 등록 성공' };
  }
}