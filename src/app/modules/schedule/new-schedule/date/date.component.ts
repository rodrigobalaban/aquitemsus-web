import { Component, Renderer2 } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Establishment, Professional } from 'src/app/shared';
import { ScheduleService, ScheduleSessionService } from '../../services';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent {
  daysWithSchedules: number[] = [];
  daySelected: Date | null = null;
  monthSelected?: Date;
  establishment: Establishment;
  professional: Professional;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _scheduleSessionService: ScheduleSessionService,
    private _renderer: Renderer2,
    private _router: Router,
    private _scheduleService: ScheduleService
  ) {
    this.establishment = this._scheduleSessionService.establishment!;
    this.professional = this._scheduleSessionService.professional!;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getMonth() != this.monthSelected?.getMonth()) {
        this.onMonthChange(date);
      }

      return 'day-' + date.getDate() + ' mat-calendar-body-disabled';
    };
  }

  async onMonthChange(date: Date): Promise<void> {
    this.monthSelected = date;
    await this.findDaysWithSchedule();

    this.setClassDatesWithSchedules();
  }

  async findDaysWithSchedule(): Promise<void> {
    this.daysWithSchedules =
      await this._scheduleService.getDaysOfMonthWithSchedules(
        this.monthSelected!.getMonth() + 1,
        this.monthSelected!.getFullYear(),
        this.establishment.id,
        this.professional.id
      );
  }

  setClassDatesWithSchedules(): void {
    this.daysWithSchedules.forEach((day) => {
      var elements = document.getElementsByClassName('day-' + day);
      this._renderer.removeClass(elements[0], 'mat-calendar-body-disabled');
    });
  }

  onSelecteDay(date: Date | null): void {
    if (date == null) {
      return;
    }

    if (!this.daysWithSchedules.includes(date.getDate())) {
      return;
    }

    this.daySelected = date;
    this._scheduleSessionService.date = date;

    this._router.navigate(['../hora'], {
      relativeTo: this._activatedRoute,
    });
  }
}
