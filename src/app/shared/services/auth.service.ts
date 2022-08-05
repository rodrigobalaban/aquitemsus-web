import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin, UserToken } from '../models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly sessionStorage = 'USER_AUTH_AQUITEMSUS_APP';

  constructor(private _http: HttpClient) {}

  get isAuthenticated(): boolean {
    return this.tokenIsValid();
  }

  get token(): string {
    const userSession = this.getUserSession();
    return 'Bearer ' + userSession?.token;
  }

  authenticate(userLogin: UserLogin): Promise<UserToken> {
    return this._http
      .post<UserToken>(`${environment.apiUrl}/auth`, userLogin)
      .pipe(tap((credential) => this.saveUserAuthSession(credential)))
      .toPromise();
  }

  private saveUserAuthSession(userToken: UserToken): void {
    localStorage.setItem(this.sessionStorage, JSON.stringify(userToken));
  }

  private tokenIsValid(): boolean {
    const userSession = this.getUserSession();
    const tokenExpiration = new Date(userSession?.expirationTime);
    const now = new Date();

    return tokenExpiration > now;
  }

  getUserSession(): UserToken {
    return JSON.parse(
      localStorage.getItem(this.sessionStorage)!
    ) as UserToken;
  }

  logout(): void {
    localStorage.clear();
  }
}
