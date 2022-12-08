import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenCloudMessage, User, UserSUS } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TokenCloudMessageService {
  private keyTokenSession = 'CLOUD_MESSAGE_AQUITEMSUS_APP';
  private moduleUrl = 'cloud-message';

  constructor(private _http: HttpClient) {}

  saveTokenInBackend(userSus: UserSUS): Promise<TokenCloudMessage> {
    const tokenCloudMessage: TokenCloudMessage = {
      token: this.getToken(),
      userSus,
    };

    return this._http
      .post<TokenCloudMessage>(
        `${environment.apiUrl}/${this.moduleUrl}`,
        JSON.stringify(tokenCloudMessage)
      )
      .toPromise();
  }

  getToken(): string {
    const token = sessionStorage.getItem(this.keyTokenSession);

    if (!token) {
      throw Error('Token de Mensagem não encontrado.');
    }

    return token;
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.keyTokenSession, token);
  }
}
