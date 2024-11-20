import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface JwtPayload {
  id: number;
  email: string;
} 

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
)