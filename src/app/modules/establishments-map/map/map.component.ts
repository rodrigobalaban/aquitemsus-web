import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { environment } from 'src/environments/environment';
import {
  CustomMapOptions,
  Establishment,
  EstablishmentCategory,
  Localization,
  UserSUS,
} from 'src/app/shared';
import {
  EstablishmentService,
  GoogleMapsService,
  LocalizationService,
} from '../services';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal';

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

  lastLocationSearched?: Localization;
  readonly DISTANCE_KM = 4;
  readonly MINIMUM_ZOOM = 15;

  isAllowedZoomRange = true;
  googleApiLoaded = false;

  mapOptions: CustomMapOptions = {
    disableDefaultUI: true,
    keyboardShortcuts: false,
    mapId: environment.googleMapId,
    zoom: this.MINIMUM_ZOOM,
  };

  user = new UserSUS();
  userLocalizationMarker!: google.maps.LatLng;

  constructor(
    private establishmentService: EstablishmentService,
    private googleMapsService: GoogleMapsService,
    private localizationService: LocalizationService,
    private modalService: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadGoogleMapApi();
    await this.setUserLocalizationMarker();
    this.searchEstablishmentsNearby(this.user.localization);
  }

  async loadGoogleMapApi(): Promise<void> {
    this.googleApiLoaded = await this.googleMapsService.loadGoogleMapApi();
  }

  async setUserLocalizationMarker(): Promise<void> {
    this.user.localization = await this.captureUserLocalization();

    this.userLocalizationMarker = this.convertLocalizationToGoogleFormat(
      this.user.localization
    );

    this.centralizeMapOn(this.user.localization);
  }

  async captureUserLocalization(): Promise<Localization> {
    return await this.localizationService.getUserLocalization();
  }

  convertLocalizationToGoogleFormat(
    localization: Localization
  ): google.maps.LatLng {
    return new google.maps.LatLng(
      localization.latitude,
      localization.longitude
    );
  }

  centralizeMapOn(localization: Localization) {
    var googleLocalization =
      this.convertLocalizationToGoogleFormat(localization);
    this.googleMap.panTo(googleLocalization);
  }

  async searchEstablishmentsNearby(localization: Localization): Promise<void> {
    this.lastLocationSearched = localization;

    this.establishmentsList =
      await this.establishmentService.getNearbyEstablishments(
        localization,
        this.DISTANCE_KM
      );
  }

  centralizeMapOnEstablishmentLocalization(establishment: Establishment) {
    this.centralizeMapOn(establishment.localization);
  }

  getIconPathByCategory(category: EstablishmentCategory): google.maps.Icon {
    return {      
      url: this.establishmentService.getIconPathByCategory(category),
      scaledSize: new google.maps.Size(50, 50),
    };
  }

  openEstablishmentInfoWindow(
    marker: MapMarker,
    establishment: Establishment
  ): void {
    this.establishmentSelected = establishment;
    this.infoWindow.open(marker);
  }

  openModalEstablishment(): void {
    this.modalService.open(ModalComponent, {
      data: {
        establishment: this.establishmentSelected,
      },
      panelClass: 'establishment-modal',
    });
  }

  onCenterMapChanged(): void {
    console.log('dispara');
    const centerMap = this.googleMap.getCenter();
    const localization = new Localization(centerMap.lat(), centerMap.lng());

    if (this.isNewLocalization(localization)) {
      this.searchEstablishmentsNearby(localization);
    }
  }

  isNewLocalization(localization: Localization): boolean {
    if (!this.isAllowedZoomRange) {
      return false;
    }

    if (this.lastLocationSearched == null) {
      return true;
    }

    if (this.distanceFromLastSearch(localization) > this.DISTANCE_KM / 2) {
      return true;
    }

    return false;
  }

  distanceFromLastSearch(localization: Localization): number {
    return this.localizationService.distanceInKm(
      localization,
      this.lastLocationSearched!
    );
  }

  onZoomChanged(): void {
    if (this.googleMap.getZoom() < this.MINIMUM_ZOOM) {
      this.clearSearchedEstablishments();
      this.isAllowedZoomRange = false;

      return;
    }

    this.isAllowedZoomRange = true;
    this.onCenterMapChanged();
  }

  clearSearchedEstablishments(): void {
    this.establishmentsList = [];
    this.lastLocationSearched = undefined;
  }
}
