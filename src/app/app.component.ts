import { Component } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { TokenCloudMessageService } from './shared/services/token-cloud-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Aqui tem SUS';

  constructor(private _tokenCloudMessageService: TokenCloudMessageService) {}

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then(
      (currentToken) => {
        if (currentToken) {
          this._tokenCloudMessageService.setToken(currentToken);
        }
      }
    );
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, () => {});
  }
}
