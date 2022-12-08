import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserSUS } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserSUS> {
  moduleUrl = 'users/sus';
  private httpWithoutInterceptor: HttpClient;

  constructor(protected http: HttpClient, private handler: HttpBackend) {
    super(http);
    this.httpWithoutInterceptor = new HttpClient(handler);
  }

  delete(idEntity: number): Promise<void> {
    throw Error('Method not available');
  }

  save(userSUS: UserSUS): Promise<UserSUS> {
    return this.httpWithoutInterceptor
      .post<UserSUS>(
        `${environment.apiUrl}/${this.moduleUrl}`,
        JSON.stringify(userSUS),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .toPromise();
  }

  resetPassword(userEmail: string): Promise<void> {
    return this.httpWithoutInterceptor
      .post<void>(`${environment.apiUrl}/users/reset-password`, userEmail)
      .toPromise();
  }
}
