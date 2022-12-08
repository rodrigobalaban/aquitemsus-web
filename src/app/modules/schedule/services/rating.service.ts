import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from 'src/app/shared/models';
import { BaseService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root',
})
export class RatingService extends BaseService<Rating> {
  moduleUrl = 'rating';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getById(id: number): Promise<Rating> {
    throw new Error('Method not available');
  }

  update(idEntity: number, entity: Rating): Promise<Rating> {
    throw new Error('Method not available');
  }

  delete(idEntity: number): Promise<void> {
    throw new Error('Method not available');
  }
}
