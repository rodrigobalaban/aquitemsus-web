import { Injectable } from '@angular/core';
import { Location } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class LocationServiceService {
  constructor() {}

  getUserLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (response) => {
          resolve(
            new Location(response.coords.latitude, response.coords.longitude)
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
