import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Establishment, EstablishmentCategory } from 'src/app/shared';
import { environment } from 'src/environments/environment';
import { Localization } from 'src/app/shared';

@Injectable({
  providedIn: 'any',
})
export class EstablishmentService {
  moduleUrl = 'establishments';

  constructor(private httpClient: HttpClient) {}

  getAllEstablishments(
    search: string,
    localization: Localization,
    page: number,
    pageSize: number
  ): Promise<Establishment[]> {
    return this.httpClient
      .get<Establishment[]>(
        `${environment.apiUrl}/${this.moduleUrl}?search=${search}&latitude=${localization.latitude}&longitude=${localization.longitude}&page=${page}&pagesize=${pageSize}`
      )
      .toPromise();
  }

  getNearbyEstablishments(
    localization: Localization,
    distance: number,
    specialties: number[]
  ): Promise<Establishment[]> {
    return this.httpClient
      .get<Establishment[]>(
        `${environment.apiUrl}/${this.moduleUrl}/localization?latitude=${localization.latitude}&longitude=${localization.longitude}&distance=${distance}&specialties=${specialties}`
      )
      .toPromise();
  }

  getEstablishmentbyId(id: number): Promise<Establishment> {
    return this.httpClient
      .get<Establishment>(`${environment.apiUrl}/${this.moduleUrl}/${id}`)
      .toPromise();
  }

  getIconPathByCategory(category: EstablishmentCategory): string {
    let path = 'assets/icons/map/';

    switch (category?.id) {
      case 1:
        path += 'unidade-basica-saude.png';
        break;
      case 2:
        path += 'central-gestao.png';
        break;
      case 3:
        path += 'central-regulacao.png';
        break;
      case 4:
        path += 'central-abastecimento.png';
        break;
      case 5:
        path += 'central-transplante.png';
        break;
      case 6:
        path += 'hospital.png';
        break;
      case 7:
        path += 'centro-obstetricia.png';
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
      case 11:
        path += 'telessaude.png';
        break;
      case 12:
        path += 'atencao-domiciliar.png';
        break;
      case 13:
        path += 'prevencao.png';
        break;
      case 14:
        path += 'casa-apoio.png';
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
      case 21:
        path += 'zoonoses.png';
        break;
      case 22:
        path += 'laboratorio-saude-publica.png';
        break;
      case 23:
        path += 'trabalhador.png';
        break;
      case 24:
        path += 'servico-obito.png';
        break;
      case 25:
        path += 'imunizacao.png';
        break;
      default:
        path += 'ambulatorio.png';
        break;
    }

    return path;
  }
}
