import { Time } from '@angular/common';

export class OfficeHour {
  constructor(
    public id: number,
    public dayOfWeek: number,
    public start: Time,
    public end: Time
  ) {}
}
