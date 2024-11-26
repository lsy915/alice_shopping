import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@root/auth/auth.guard";
import { PostProvider } from './post.provider';
import { CreateMenuDto } from './dto/create.menu.dto';
import { JwtPayload, User } from '@root/auth/decorator/auth.jwt.decorator';
import { CreateMenuFail, CreateMenuSuccess } from './docs/CreateMenuDocs';

@Controller('menu')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class MenuController {
  constructor(private readonly menuProvider: PostProvider) {}

  @ApiTags('Post')
  @ApiOperation({
    summary: '메뉴 등록 API',
    description: '메뉴 등록 API 입니다.',
  })
  @ApiCreatedResponse({
    description: '메뉴 등록에 성공했습니다.',
    type: CreateMenuSuccess,
  })
  @ApiUnauthorizedResponse({
    description: '유효하지 않은 사용자 입니다.',
    type: CreateMenuFail,
  })
  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto, @User() user:JwtPayload) {
    return this.menuProvider.createMenu(createMenuDto, user);
  }
}
