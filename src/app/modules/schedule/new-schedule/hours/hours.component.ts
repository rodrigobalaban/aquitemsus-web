import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Schedule, UserToken } from 'src/app/shared';
import { AuthService, MessageService } from 'src/app/shared/services';
import { ScheduleService, ScheduleSessionService } from '../../services';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss'],
})
export class HoursComponent implements OnInit {
  schedules: Schedule[] = [];
  scheduleSession: Schedule;
  user: UserToken;

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router,
    private _scheduleSessionService: ScheduleSessionService,
    private _scheduleService: ScheduleService
  ) {
    this.scheduleSession = this._scheduleSessionService.schedule;
    this.user = this._authService.getUserSession();
  }

  ngOnInit(): void {
    this.findSchedulesAvailablesInDay();
  }

  async findSchedulesAvailablesInDay(): Promise<void> {
    const date = new Date(this.scheduleSession.date!);

    this.schedules = await this._scheduleService.getSchedulesAvailablesInDay(
      date,
      this.scheduleSession.establishment!.id,
      this.scheduleSession.professional!.id
    );
  }

  toDate(dateISO: string): Date {
    return new Date(dateISO);
  }

  onSelectSchedule(schedule: Schedule): void {
    this.scheduleSession = schedule;
    this._scheduleSessionService.schedule = this.scheduleSession;
  }

  async confirmSchedule(): Promise<void> {
    this.scheduleSession.userSus = { id: this.user.id };

    try {
      await this._scheduleService.update(
        this.scheduleSession.id!,
        this.scheduleSession
      );

      this._messageService.show('O agendamento foi realizado com sucesso!');
      this._router.navigate(['/dashboard']);
    } catch {
      this._messageService.show(
        'Houve um erro ao realizar o agendamento. Tente novamente mais tarde!'
      );
    }
  }
}
