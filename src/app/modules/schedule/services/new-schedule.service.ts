import { Injectable } from '@angular/core';
import { Establishment, Professional, Specialty } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class NewScheduleService {
  public establishment?: Establishment;
  public specialty?: Specialty;
  public professional?: Professional;

  constructor() { }
}
