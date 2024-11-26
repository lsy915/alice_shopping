import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@root/auth/auth.guard";
import { DeliveryProvider } from "./delivery.provider";
import { CreateDeliveryDto } from "./dto/create.delivery.dto";
import { JwtPayload, User } from "@root/auth/decorator/auth.jwt.decorator";
import { CreateDelivryFail, CreateDelivrySuccess } from "./docs/CreateDeliveryDocs";

@Controller('delivery')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class DeliveryController {
  constructor(private readonly deliveryProvider: DeliveryProvider) {}

  @ApiTags('Delivery')
  @ApiOperation({
    summary: '배송지 추가 API',
    description: '새로운 배송지를 추가합니다.',
  })
  @ApiCreatedResponse({
    description: '배송지 추가에 성공했습니다.',
    type: CreateDelivrySuccess,
  })
  @ApiUnauthorizedResponse({
    description: '유효하지 않은 사용자 입니다.',
    type: CreateDelivryFail,
  })
  @Post()
  async createDelivery(@Body() dto: CreateDeliveryDto, @User() user: JwtPayload) {
    const delivery = await this.deliveryProvider.createDelivery(dto, user.id);
    return { message: '배송지 추가 성공', deliveryId: delivery.id };
  }

  @ApiTags('Delivery')
  @ApiOperation({
    summary: '배송지 삭제 API',
    description: '특정 배송지를 삭제합니다.',
  })
  @Delete(':id')
  async deleteDelivery(@Param('id') id: number, @User() user: JwtPayload) {
    await this.deliveryProvider.deleteDelivery(id, user.id);
    return { message: '배송지 삭제 성공' };
  }
}