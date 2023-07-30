import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Scope } from '@nestjs/common';
import { InterceptorsInterceptor } from './interceptors.interceptor';

@Module({
    providers: [
        {
          provide: APP_INTERCEPTOR,
          scope: Scope.REQUEST,
          useClass: InterceptorsInterceptor,
        },
      ],
})
export class InterceptorsModule {}
