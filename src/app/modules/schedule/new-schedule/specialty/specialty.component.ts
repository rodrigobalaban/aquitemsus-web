import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Establishment, Specialty } from 'src/app/shared';
import { ScheduleSessionService } from '../../services';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss'],
})
export class SpecialtyComponent {
  establishment: Establishment;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _scheduleSessionService: ScheduleSessionService,
    private _router: Router
  ) {
    this.establishment = this._scheduleSessionService.establishment!;
  }

  onSelected(specialty: Specialty) {
    this._scheduleSessionService.specialty = specialty;
    this._router.navigate(['../profissional'], {
      relativeTo: this._activatedRoute,
    });
  }
}
