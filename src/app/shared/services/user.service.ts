import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  moduleUrl = 'users';

  constructor(private _http: HttpClient) {}

  register(user: User): Promise<User> {
    return this._http
      .post<User>(
        `${environment.apiUrl}/${this.moduleUrl}/register-user`,
        JSON.stringify(user)
      )
      .toPromise();
  }

  resetPassword(userEmail: string): Promise<void> {
    return this._http
      .post<void>(
        `${environment.apiUrl}/${this.moduleUrl}/reset-password`,
        userEmail
      )
      .toPromise();
  }
}
