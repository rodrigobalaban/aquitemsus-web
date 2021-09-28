import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  CustomMapOptions,
  Establishment,
  EstablishmentCategory,
  Location,
  UserSUS,
} from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { EstablishmentService, LocationService } from '../services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [EstablishmentService],
})
export class MapComponent {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  
  apiLoaded!: Observable<boolean>;
  establishments: Establishment[] = [];
  establishmentSelected!: Establishment;
  mapOptions!: CustomMapOptions;
  markerUserLocation!: google.maps.LatLngLiteral;
  user = new UserSUS();

  constructor(
    private establishmentService: EstablishmentService,
    private locationService: LocationService,
    private httpClient: HttpClient
  ) {
    this.buildMap();
    this.searchEstablishmentsNearby();
  }

  async buildMap(): Promise<void> {
    await this.captureUserLocation();

    this.markerUserLocation = {
      lng: this.user.location.longitude,
      lat: this.user.location.latitude,
    };

    this.mapOptions = {
      center: this.markerUserLocation,
      disableDefaultUI: true,
      keyboardShortcuts: false,
      mapId: environment.googleMapId,      
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

  async searchEstablishmentsNearby(): Promise<void> {
    this.establishments =
      await this.establishmentService.getNearbyEstablishments();
  }

  getMarkerPosition(location: Location) {
    return new google.maps.LatLng(location.latitude, location.longitude);
  }

  getPathIconByCategory(category: EstablishmentCategory) {
    let path = 'assets/icons/map/';

    switch (category.id) {
      case 2:
        path += 'farmacia.svg';
        break;
      default:
        path += 'unidade-basica-saude.svg';
        break;
    }

    return path;
  }

  openEstablishmentDetails(marker: MapMarker, establishment: Establishment) {
    this.establishmentSelected = establishment;
    this.infoWindow.open(marker)
  }
}
