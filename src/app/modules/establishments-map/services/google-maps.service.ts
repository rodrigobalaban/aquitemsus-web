import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  constructor(private httpClient: HttpClient) {}

  loadGoogleMapApi(): Promise<boolean> {
    return this.httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' +
          environment.googleMapsApiKey,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
      .toPromise();
  }
}
