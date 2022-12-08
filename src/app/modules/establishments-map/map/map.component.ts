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
import { ActivatedRoute } from '@angular/router';

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
  specialtiesIds: number[] = [];

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
    private _activatedRoute: ActivatedRoute,
    private _establishmentService: EstablishmentService,
    private _googleMapsService: GoogleMapsService,
    private _localizationService: LocalizationService,
    private _modalService: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.checkQueryParams();
    await this.loadGoogleMapApi();
    await this.setUserLocalizationMarker();
    this.searchEstablishmentsNearby(this.user.localization!);
  }

  checkQueryParams(): void {
    const specialties: number[] = this._activatedRoute.snapshot.queryParams.specialties;

    if (specialties) {
      this.specialtiesIds = specialties;
    }
  }

  async loadGoogleMapApi(): Promise<void> {
    this.googleApiLoaded = await this._googleMapsService.loadGoogleMapApi();
  }

  async setUserLocalizationMarker(): Promise<void> {
    this.user.localization = await this.captureUserLocalization();

    this.userLocalizationMarker = this.convertLocalizationToGoogleFormat(
      this.user.localization
    );

    this.centralizeMapOn(this.user.localization);
  }

  async captureUserLocalization(): Promise<Localization> {
    return await this._localizationService.getUserLocalization();
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
      await this._establishmentService.getNearbyEstablishments(
        localization,
        this.DISTANCE_KM,
        this.specialtiesIds
      );
  }

  centralizeMapOnEstablishmentLocalization(establishment: Establishment) {
    this.searchEstablishmentsNearby(establishment.localization);
    this.centralizeMapOn(establishment.localization);
  }

  getIconPathByCategory(category: EstablishmentCategory): google.maps.Icon {
    return {
      url: this._establishmentService.getIconPathByCategory(category),
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
    this._modalService.open(ModalComponent, {
      data: {
        establishment: this.establishmentSelected,
      },
      panelClass: 'establishment-modal',
    });
  }

  onCenterMapChanged(): void {
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
    return this._localizationService.distanceInKm(
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
