import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { OrderProvider } from "./order.provider";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@root/auth/auth.guard";
import { CreateOrderDto } from "./dto/create.order.dto";
import { JwtPayload, User } from "@root/auth/decorator/auth.jwt.decorator";
import { CreateOrderFail, CreateOrderSuccess } from "./docs/CreateOrderDocs";

@Controller('order')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderProvider: OrderProvider) {}

  @ApiTags('Order')
  @ApiOperation({
    summary: '주문 생성 API',
    description: '주문을 생성합니다.',
  })
  @ApiCreatedResponse({
    description: '주문 등록에 성공했습니다.',
    type: CreateOrderSuccess,
  })
  @ApiUnauthorizedResponse({
    description: '유효하지 않은 사용자 입니다.',
    type: CreateOrderFail,
  })
  @Post()
  async createOrder(@Body() dto: CreateOrderDto, @User() user: JwtPayload) {
    const order = await this.orderProvider.createOrder(dto, user.id);
    return { message: '주문 생성 성공', orderId: order.id };
  }
  
}