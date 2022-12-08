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
    let httpHeaders = {};
    const token = this._authService.token;    

    if (token) {
      httpHeaders = { Authorization: token, 'Content-Type': 'application/json' };
    } else {
      httpHeaders = { 'Content-Type': 'application/json' };
    }

    const cloneRequest = request.clone({
      setHeaders: httpHeaders,
    });

    return next.handle(cloneRequest);
  }
}
