import { Injectable } from '@nestjs/common';
import { Provider, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export const REQUEST_CONTEXT = 'REQUEST_CONTEXT';

export interface RequestContext {
    request: Request;
}

export const RequestContextProvider: Provider<RequestContext> = {
    provide: REQUEST_CONTEXT,
    scope: Scope.REQUEST,
    useFactory: (request: Request) => ({ request }),
    inject: [REQUEST],
  };

/* @Injectable()
export class RequestProvider {} */
