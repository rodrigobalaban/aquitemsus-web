import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Establishment, EstablishmentCategory } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { Localization } from 'src/app/shared';

@Injectable({
  providedIn: 'any',
})
export class EstablishmentService {
  constructor(private httpClient: HttpClient) {}

  getNearbyEstablishments(
    localization: Localization,
    distance: number
  ): Promise<Establishment[]> {
    return this.httpClient
      .get<Establishment[]>(
        `${environment.apiUrl}/establishments?latitude=${localization.latitude}&longitude=${localization.longitude}&distance=${distance}`
      )
      .toPromise();
  }

  getEstablishmentbyId(id: number): Promise<Establishment> {
    return this.httpClient
      .get<Establishment>(`${environment.apiUrl}/establishments/${id}`)
      .toPromise();
  }

  getIconPathByCategory(category: EstablishmentCategory): string {
    let path = 'assets/icons/map/';

    switch (category?.id) {
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
