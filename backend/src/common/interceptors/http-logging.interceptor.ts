import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request =
      context.switchToHttp().getRequest();

    const response =
      context.switchToHttp().getResponse();

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration =
          Date.now() - startTime;

        console.log(
          `[HTTP] ${request.method} ${request.originalUrl} ${response.statusCode} - ${duration}ms`,
        );
      }),
    );
  }
}