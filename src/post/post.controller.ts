import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
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

  @ApiTags('Post')
  @ApiOperation({
    summary: '',
    description: '',
  })
  @ApiCreatedResponse({
    description: '',
    type: CreatePostSuccess,
  })
  @ApiUnauthorizedResponse({
    description: '',
    type: CreatePostFail,
  })
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @User() user: JwtPayload) {
    return await this.postProvider.create(createPostDto, user);
  }
}