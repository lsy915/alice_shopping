import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@root/auth/auth.guard";
import { JwtPayload, User } from "@root/auth/decorator/auth.jwt.decorator";
import { PostProvider } from "./post.provider";
import { CreatePostDto } from "./dto/create.post.dto";
import { CreatePostFail, CreatePostSuccess } from "./docs/CreatePostDocs";

@Controller('post')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class PostController {
  constructor(private readonly postProvider: PostProvider) {}
//-------------------------------------------------------------------------------------------------------
  @ApiTags('Post')
  @ApiOperation({
    summary: '상품 등록 API',
    description: '상품 등록 API 입니다.',
  })
  @ApiCreatedResponse({
    description: '상품 등록에 성공했습니다.',
    type: CreatePostSuccess,
  })
  @ApiUnauthorizedResponse({
    description: '유효하지 않은 사용자 입니다.',
    type: CreatePostFail,
  })
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @User() user: JwtPayload) {
    return await this.postProvider.create(createPostDto, user);
  }
//-------------------------------------------------------------------------------------------------------
  @ApiTags('Post')
  @ApiOperation({ summary: '특정 상품 조회', description: '상품 ID를 사용하여 특정 상품을 조회합니다.' })
  @ApiParam({ name: 'id', description: '상품 ID', example: 1 })
  @Get(':id')
  async getPostById(@Param('id') id: number) {
    const post = await this.postProvider.findPostById(id);
    return { message: '상품 조회 성공' , data: post };
  }
//-------------------------------------------------------------------------------------------------------
  @ApiTags('Post')
  @ApiOperation({ summary: '급상승 랭킹 조회', description: '조회 수 기준으로 급상승 랭킹 상품을 조회합니다.' })
  @Get('top')
  async getTopPost() {
    const topPost = await this.postProvider.getTopPost();
    return { message: '급상승 랭킹 조회 성공', data: topPost };
  }
//-------------------------------------------------------------------------------------------------------
  @ApiTags('Post')
  @ApiOperation({
    summary: '특정 메뉴의 상품 리스트 조회',
    description: '특정 메뉴에 속한 상품의 이름, 가격, 이미지를 조회합니다.',
  })
  @ApiParam({ name: 'menuId', description: '메뉴 ID', example: 1 })
  @Get(':menuId/post')
  async getPostsByMenu(@Param('menuId') menuId: number) {
    const post = await this.postProvider.getPostByMenu(menuId);
    return { message: '상품 리스트 조회 성공', data: post };
  }
  //-------------------------------------------------------------------------------------------------------
}