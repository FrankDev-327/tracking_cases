import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class InterceptorsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InterceptorsInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    this.logger.log(`Request: ${method} ${url}`);
 
    return next
    .handle()
    .pipe(
      map((response) => {
        this.logger.log('Responded successfully');
        return response;
      })
    );
  }
}
