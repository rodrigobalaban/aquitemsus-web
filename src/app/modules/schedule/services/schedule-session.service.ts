import { Injectable } from '@angular/core';
import {
  Establishment,
  Professional,
  Schedule,
  Specialty,
} from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class ScheduleSessionService {
  private keySessionSchedule = 'TEMP_NEW_SCHEDULE';
  private keySessionSpecialty = 'TEMP_NEW_SCHEDULE_SPECIALTY';

  constructor() {}

  set establishment(establishment: Establishment | null) {
    const schedule = this.getScheduleSession();
    schedule.establishment = establishment;
    this.saveScheduleSession(schedule);
  }

  get schedule(): Schedule {
    return this.getScheduleSession();
  }

  set schedule(schedule: Schedule) {
    this.saveScheduleSession(schedule);
  }

  get establishment(): Establishment | null {
    return this.getScheduleSession().establishment;
  }

  set specialty(specialty: Specialty | null) {
    if (specialty == null) {
      return;
    }

    this.saveSpecialtySession(specialty);
  }

  get specialty(): Specialty | null {
    return this.getSpecialtySession();
  }

  set professional(professional: Professional | null) {
    const schedule = this.getScheduleSession();
    schedule.professional = professional;
    this.saveScheduleSession(schedule);
  }

  get professional(): Professional | null {
    return this.getScheduleSession().professional;
  }

  set date(date: Date | null) {
    if (!date) {
      return;
    }

    const schedule = this.getScheduleSession();
    schedule.id = null;
    schedule.date = date.toISOString();
    this.saveScheduleSession(schedule);
  }

  get date(): Date | null {
    const date = this.getScheduleSession().date;

    if (date) {
      return new Date(date);
    }

    return null;
  }

  private saveScheduleSession(schedule: Schedule) {
    sessionStorage.setItem(this.keySessionSchedule, JSON.stringify(schedule));
  }

  private getScheduleSession(): Schedule {
    var scheduleSession = sessionStorage.getItem(this.keySessionSchedule);

    if (scheduleSession == null) {
      return {
        id: null,
        date: null,
        establishment: null,
        professional: null,
        status: null,
        userSus: null,
      };
    }

    return JSON.parse(scheduleSession) as Schedule;
  }

  private saveSpecialtySession(specialty: Specialty) {
    sessionStorage.setItem(this.keySessionSpecialty, JSON.stringify(specialty));
  }

  private getSpecialtySession(): Specialty | null {
    var specialtySession = sessionStorage.getItem(this.keySessionSpecialty);

    if (specialtySession == null) {
      return null;
    }

    return JSON.parse(specialtySession) as Specialty;
  }
}
