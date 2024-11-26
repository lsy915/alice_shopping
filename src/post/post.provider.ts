import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@root/entity/Post.entity";
import { User } from "@root/entity/User.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create.post.dto";
import { JwtPayload } from "@root/auth/decorator/auth.jwt.decorator";
import { Size } from "@root/entity/Size.entity";
import { Menu } from "@root/entity/Menu.entity";
import { CreateMenuDto } from "./dto/create.menu.dto";

@Injectable()
export class PostProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async createMenu(dto: CreateMenuDto, user: JwtPayload) {
    const findUser = await this.userRepository.findOne({where: { id: user.id },});
    if (!findUser) {
      throw new UnauthorizedException('유효하지 않은 사용자 입니다.');
    }
    if(!findUser.admin) {
      throw new UnauthorizedException('권한이 없습니다.')
    }
    const menuCount = await this.menuRepository.count();
    if (menuCount >= 4) {
      throw new BadRequestException('메뉴는 최대 4개까지 생성 가능합니다.');
    }
    const menu = this.menuRepository.create({ name: dto.name });
    return this.menuRepository.save(menu);
  }

  async create(dto: CreatePostDto, user: JwtPayload) {
    const { name, content, price, imgurl, size, menuId } = dto;

    const findUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!findUser) {
      throw new UnauthorizedException('유효하지 않은 사용자 입니다.');
    }

    const findMenu = await this.menuRepository.findOne({ where: { id: menuId } });
    if (!findMenu) {
      throw new Error('해당 메뉴가 존재하지 않습니다.');
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

  async findPostById(postId: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id: postId }});
    if (!post) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    post.view += 1;
    await this.postRepository.save(post);

    return post;
  }

  async getTopPost(): Promise<Post[]> {
    return this.postRepository.find({ select: ['imgurl', 'price', 'name'], order: { view: 'DESC' }, take: 3 });
  }

  async getPostByMenu(menuId: number): Promise<Post[]> {
    const menu = await this.menuRepository.findOne({ where: { id: menuId } });
    if (!menu) {
      throw new NotFoundException('해당 메뉴를 찾을 수 없습니다.');
    }

    const post = await this.postRepository.find({
      where: { menu: menu },
      select: ['imgurl', 'price', 'name'], // 필요한 필드만 가져오기
    });
    return post;
  }
}