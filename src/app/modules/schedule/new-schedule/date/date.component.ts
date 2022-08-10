import { Component } from '@angular/core';
import { Professional } from 'src/app/shared';
import { NewScheduleService } from '../../services';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent {
  professional: Professional;

  constructor(private _newScheduleService: NewScheduleService) {
    this.professional = this._newScheduleService.professional!;
  }
}
