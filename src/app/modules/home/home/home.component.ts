import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { UserToken } from 'src/app/shared';
import { AuthService } from 'src/app/shared/services';
import { ScheduleService } from '../../schedule/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  countSchedules = 0;
  user: UserToken;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _scheduleService: ScheduleService
  ) {
    this.user = this._authService.getUserSession();
  }

  async ngOnInit(): Promise<void> {
    this.countSchedules = await this._scheduleService.countUserSchedules(
      this.user.id!
    );
  }

  searchImmunizationEstablishments() {
    const immunizationId = [174];
    this.showMapWithSpecialty(immunizationId);
  }

  searchEmergencyEstablishments() {
    const emergencyIds = [103, 140, 143];
    this.showMapWithSpecialty(emergencyIds);
  }

  private showMapWithSpecialty(specialtiesIds: number[]) {
    let queryParams: Params = { specialties: specialtiesIds.join(',') };

    this._router.navigate(['/mapa'], {
      queryParams,
    });
  }
}
