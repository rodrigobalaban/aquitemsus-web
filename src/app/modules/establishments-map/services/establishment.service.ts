import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Establishment, EstablishmentCategory } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  constructor(private httpClient: HttpClient) {}

  getNearbyEstablishments(): Promise<Establishment[]> {
    return this.httpClient
      .get<Establishment[]>('assets/data/establishments-nearby.json')
      .toPromise();
  }

  getIconPathByCategory(category: EstablishmentCategory): string {
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
}
