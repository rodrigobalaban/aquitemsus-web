import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Establishment } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  constructor(private httpClient: HttpClient) {}

  getNearbyEstablishments(): Promise<Establishment[]> {
    return this.httpClient.get<Establishment[]>('assets/data/establishments-nearby.json').toPromise();
  }
}
