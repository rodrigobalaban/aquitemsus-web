import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  moduleUrl = '';

  constructor(protected http: HttpClient) {}

  getById(id: number): Promise<T> {
    return this.http
      .get<T>(`${environment.apiUrl}/${this.moduleUrl}/${id}`)
      .toPromise();
  }

  save(entity: T): Promise<T> {
    return this.http
      .post<T>(
        `${environment.apiUrl}/${this.moduleUrl}`,
        JSON.stringify(entity)
      )
      .toPromise();
  }

  update(idEntity: number, entity: T): Promise<T> {
    return this.http
      .put<T>(
        `${environment.apiUrl}/${this.moduleUrl}/${idEntity}`,
        JSON.stringify(entity)
      )
      .toPromise();
  }

  delete(idEntity: number): Promise<void> {
    return this.http
      .delete<void>(`${environment.apiUrl}/${this.moduleUrl}/${idEntity}`)
      .toPromise();
  }
}
