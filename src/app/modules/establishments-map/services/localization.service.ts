import { Injectable } from '@angular/core';
import { Localization } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  constructor() {}

  getUserLocalization(): Promise<Localization> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (response) => {
          resolve(
            new Localization(
              response.coords.latitude,
              response.coords.longitude
            )
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  distanceInKm(localizationA: Localization, localizationB: Localization) {
    const toRadian = (angle: number) => (Math.PI / 180) * angle;
    const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;

    const distanceLatitude = distance(
      localizationB.latitude,
      localizationA.latitude
    );
    const distanceLongitude = distance(
      localizationB.longitude,
      localizationB.longitude
    );

    const latitudeA = toRadian(localizationA.latitude);
    const latitudeB = toRadian(localizationB.latitude);

    const a =
      Math.pow(Math.sin(distanceLatitude / 2), 2) +
      Math.pow(Math.sin(distanceLongitude / 2), 2) *
        Math.cos(latitudeA) *
        Math.cos(latitudeB);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

    return finalDistance;
  }
}
