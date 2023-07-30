import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CasesSubscriber } from 'src/subscribers/cases-subscriber';

export const UserLogged = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);