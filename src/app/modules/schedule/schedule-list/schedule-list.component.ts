import { Component, OnInit } from '@angular/core';
import { Schedule, UserToken } from 'src/app/shared/models';
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

  getStatusDescription(status: string): string {
    switch (status) {
      case 'Available':
        return 'Disponível';
      case 'Reserved':
        return 'Reservado';
      case 'Confirmed':
        return 'Confirmado';
      case 'Complete':
        return 'Completo';
      case 'Canceled':
        return 'Cancelado';
      default:
        return '';
    }
  }

  toDate(dateISOString: string): Date {
    return new Date(dateISOString);
  }
}
