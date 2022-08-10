import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Establishment, Specialty } from 'src/app/shared';
import { NewScheduleService } from '../../services';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss'],
})
export class SpecialtyComponent {
  establishment: Establishment;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _newScheduleService: NewScheduleService,
    private _router: Router
  ) {
    this.establishment = this._newScheduleService.establishment!;
  }

  onSelected(specialty: Specialty) {
    this._newScheduleService.specialty = specialty;
    this._router.navigate(['../profissional'], {
      relativeTo: this._activatedRoute,
    });
  }
}
