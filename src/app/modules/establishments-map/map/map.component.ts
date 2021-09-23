import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomMapOptions, UserSUS } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { LocationService } from '../services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  apiLoaded!: Observable<boolean>;
  mapOptions!: CustomMapOptions;
  markerUserLocation!: google.maps.LatLngLiteral;
  user = new UserSUS();

  constructor(
    private locationService: LocationService,
    private httpClient: HttpClient
  ) {
    this.buildMap();
  }

  async buildMap(): Promise<void> {
    await this.captureUserLocation();

    this.markerUserLocation = {
      lng: this.user.location.longitude,
      lat: this.user.location.latitude,
    };

    this.mapOptions = {
      disableDefaultUI: true, 
      mapId: environment.googleMapId,
      center: this.markerUserLocation,
      zoom: 15,
    };

    this.apiLoaded = this.httpClient
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

  async captureUserLocation(): Promise<void> {
    this.user.location = await this.locationService.getUserLocation();
  }
}
