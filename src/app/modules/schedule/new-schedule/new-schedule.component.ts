import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Establishment } from 'src/app/shared';
import { EstablishmentService } from '../../establishments-map';
import { ScheduleSessionService } from '../services';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
})
export class NewScheduleComponent implements OnInit {
  establishment!: Establishment;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _establishmentService: EstablishmentService,
    private _location: Location,
    private _scheduleSessionService: ScheduleSessionService,
    private _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const id: number =
      this._activatedRoute.snapshot.queryParams.estabelecimento;

    if (id) {
      await this.findEstablishment(id);

      this._router.navigate(['especialidade'], {
        relativeTo: this._activatedRoute,
      });

      return;
    }

    const establishmentSession = this._scheduleSessionService.establishment;

    if (establishmentSession) {
      this.establishment = establishmentSession;
    }
  }

  async findEstablishment(id: number) {
    this.establishment = await this._establishmentService.getEstablishmentbyId(
      id
    );

    this._scheduleSessionService.establishment = this.establishment;
  }

  backPage(): void {
    this._location.back();
  }
}
