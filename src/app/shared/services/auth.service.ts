import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin, UserSUS, UserToken } from '../models';
import { tap } from 'rxjs/operators';
import { TokenCloudMessageService } from './token-cloud-message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keyLocalStorage = 'USER_AUTH_AQUITEMSUS_APP';

  constructor(
    private _http: HttpClient,
    private _tokenCloudMessageService: TokenCloudMessageService
  ) {}

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
      .pipe(
        tap((credential) => {
          this.saveUserAuthSession(credential);
          this.saveCloudMessageTokenInBackend();
        })
      )
      .toPromise();
  }

  private saveUserAuthSession(userToken: UserToken): void {
    localStorage.setItem(this.keyLocalStorage, JSON.stringify(userToken));
  }

  private async saveCloudMessageTokenInBackend(): Promise<void> {
    const userSus: UserSUS = { id: this.getUserSession().id };
    await this._tokenCloudMessageService.saveTokenInBackend(userSus);
  }

  private tokenIsValid(): boolean {
    const userSession = this.getUserSession();
    const tokenExpiration = new Date(userSession?.expirationTime);
    const now = new Date();

    return tokenExpiration > now;
  }

  getUserSession(): UserToken {
    return JSON.parse(localStorage.getItem(this.keyLocalStorage)!) as UserToken;
  }

  logout(): void {
    localStorage.clear();
  }
}
