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
      case 1:
        path += 'unidade-basica-saude.svg';
        break;
      case 2:
        path += 'central-gestao.png';
        break;
      case 4:
        path += 'central-abastecimento.png';
        break;
      case 6:
        path += 'hospital.png';
        break;
      case 8:
        path += 'pronto-atendimento.png';
        break;
      case 9:
        path += 'farmacia.png';
        break;
      case 10:
        path += 'hematologia.png';
        break;
      case 15:
        path += 'reabilitacao.png';
        break;
      case 16:
        path += 'ambulatorio.png';
        break;
      case 17:
        path += 'atencao-psicosocial.png';
        break;
      case 18:
        path += 'apoio-diagnostico.png';
        break;
      case 19:
        path += 'terapias-especiais.png';
        break;
      case 20:
        path += 'protese-dentaria.png';
        break;
      case 25:
        path += 'imunizacao.png';
        break;
      default:
        path += 'user-location.svg';
        break;
    }

    return path;
  }
}
