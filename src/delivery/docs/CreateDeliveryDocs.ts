import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

@ApiExtraModels()
export class CreateDelivrySuccess {
  @ApiProperty({
    type: 'string', title: '성공 응답 값', description: '배송지 등록 성공',
  })
  message: string;
}

@ApiExtraModels()
export class CreateDelivryFail {
  @ApiProperty({
    type: 'number', title: '실패 응답 값', description: '401',
  })
  statusCode: number;

  @ApiProperty({
    type: 'string', title: '실패 응답 값', description: '유효하지 않은 사용자 입니다.',
  })
  message: string;

  @ApiProperty({
    type: 'string', title: '실패 응답 값', description: 'Unauthorized',
  })
  error: string;
}