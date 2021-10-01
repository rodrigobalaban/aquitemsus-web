import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { environment } from 'src/environments/environment';
import {
  CustomMapOptions,
  Establishment,
  EstablishmentCategory,
  Location,
  UserSUS,
} from 'src/app/shared';
import {
  EstablishmentService,
  GoogleMapsService,
  LocationService,
} from '../services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [EstablishmentService, GoogleMapsService],
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('googleMap') googleMap!: GoogleMap;

  establishmentsList: Establishment[] | undefined;
  establishmentSelected: Establishment | undefined;

  googleApiLoaded = false;
  mapOptions!: CustomMapOptions;

  user = new UserSUS();
  userLocationMarker!: google.maps.LatLng;

  constructor(
    private establishmentService: EstablishmentService,
    private googleMapsService: GoogleMapsService,
    private locationService: LocationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadGoogleMapApi();

    this.setMapOptions();
    this.setUserLocationMarker();
    this.searchEstablishmentsNearby();
  }

  async loadGoogleMapApi(): Promise<void> {
    this.googleApiLoaded = await this.googleMapsService.loadGoogleMapApi();
  }

  setMapOptions(): void {
    this.mapOptions = {
      disableDefaultUI: true,
      keyboardShortcuts: false,
      mapId: environment.googleMapId,
      zoom: 15,
    };
  }

  async setUserLocationMarker(): Promise<void> {
    this.user.location = await this.captureUserLocation();

    this.userLocationMarker = this.convertLocationToGoogleFormat(
      this.user.location
    );

    this.centralizeMapOn(this.user.location);
  }

  async captureUserLocation(): Promise<Location> {
    return await this.locationService.getUserLocation();
  }

  convertLocationToGoogleFormat(location: Location): google.maps.LatLng {
    return new google.maps.LatLng(location.latitude, location.longitude);
  }

  centralizeMapOn(location: Location) {
    var googleLocation = this.convertLocationToGoogleFormat(location);
    this.googleMap.panTo(googleLocation);
  }

  async searchEstablishmentsNearby(): Promise<void> {
    this.establishmentsList =
      await this.establishmentService.getNearbyEstablishments();
  }

  centralizeMapOnEstablishmentLocation(establishment: Establishment) {
    this.centralizeMapOn(establishment.location);
  }

  getIconPathByCategory(category: EstablishmentCategory): string {
    return this.establishmentService.getIconPathByCategory(category);
  }

  openEstablishmentInfoWindow(
    marker: MapMarker,
    establishment: Establishment
  ): void {
    this.establishmentSelected = establishment;
    this.infoWindow.open(marker);
  }
}
