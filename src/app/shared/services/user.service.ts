import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserSUS } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserSUS> {
  moduleUrl = 'users/sus';

  constructor(protected http: HttpClient) {
    super(http);
  }

  delete(idEntity: number): Promise<void> {
    throw Error('Method not available');
  }

  resetPassword(userEmail: string): Promise<void> {
    return this.http
      .post<void>(
        `${environment.apiUrl}/${this.moduleUrl}/reset-password`,
        userEmail
      )
      .toPromise();
  }
}
