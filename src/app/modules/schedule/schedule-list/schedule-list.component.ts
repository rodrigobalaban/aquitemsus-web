import { Component, OnInit } from '@angular/core';
import { Schedule, UserToken } from 'src/app/shared/models';
import { ScheduleStatus } from 'src/app/shared/models/enums';
import { AuthService } from 'src/app/shared/services';
import { ScheduleService } from '../services';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {
  schedules: Schedule[] = [];
  user: UserToken;

  constructor(
    private _authService: AuthService,
    private _scheduleService: ScheduleService
  ) {
    this.user = this._authService.getUserSession();
  }

  async ngOnInit(): Promise<void> {
    this.schedules = await this._scheduleService.getAll(this.user.id!);
  }

  getStatusDescription(status: ScheduleStatus): string {
    return this._scheduleService.getScheduleStatusDescription(status);
  }

  toDate(dateISOString: string): Date {
    return new Date(dateISOString);
  }

  canEvaluate(status: ScheduleStatus) {
    return status === ScheduleStatus.Complete;
  }
}
