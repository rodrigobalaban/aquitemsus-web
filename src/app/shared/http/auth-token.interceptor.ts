import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this._authService.token;
    const cloneRequest = request.clone({
      setHeaders: { Authorization: token, 'Content-Type': 'application/json' },
    });
    return next.handle(cloneRequest);
  }
}
