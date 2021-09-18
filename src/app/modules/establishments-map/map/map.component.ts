import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomMapOptions } from 'src/app/shared/interfaces/custom-map-options.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  apiLoaded: Observable<boolean>;
  mapOptions: CustomMapOptions;

  constructor(httpClient: HttpClient) {
    this.mapOptions = {
      mapId: environment.googleMapId,
    };

    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=' +
          environment.googleMapsApiKey,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
