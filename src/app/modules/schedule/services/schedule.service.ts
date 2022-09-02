import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from 'src/app/shared';
import { BaseService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService extends BaseService<Schedule> {
  moduleUrl = 'schedules';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAll(userId: number): Promise<Schedule[]> {
    return this.http
      .get<Schedule[]>(
        `${environment.apiUrl}/${this.moduleUrl}/user?userId=${userId}`
      )
      .toPromise();
  }

  getDaysOfMonthWithSchedules(
    month: number,
    year: number,
    idEstablishment: number,
    idProfessional: number
  ): Promise<number[]> {
    return this.http
      .get<number[]>(
        `${environment.apiUrl}/${this.moduleUrl}/days-of-month?month=${month}&year=${year}&idEstablishment=${idEstablishment}&idProfessional=${idProfessional}`
      )
      .toPromise();
  }

  getSchedulesAvailablesInDay(
    date: Date,
    idEstablishment: number,
    idProfessional: number
  ): Promise<Schedule[]> {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return this.http
      .get<Schedule[]>(
        `${environment.apiUrl}/${this.moduleUrl}?day=${day}&month=${month}&year=${year}&idEstablishment=${idEstablishment}&idProfessional=${idProfessional}`
      )
      .toPromise();
  }
}
