import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Establishment, Professional, Specialty } from 'src/app/shared';
import { NewScheduleService } from '../../services';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
})
export class ProfessionalComponent {
  establishment: Establishment;
  specialty: Specialty;
  professionals: Professional[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _newScheduleService: NewScheduleService,
    private _router: Router
  ) {
    this.establishment = this._newScheduleService.establishment!;
    this.specialty = this._newScheduleService.specialty!;

    this.findProfessionals();
  }

  findProfessionals(): void {
    this.professionals = this.establishment.professionals.filter(
      (professional) => professional.specialty.id === this.specialty.id
    );
  }

  onSelected(professional: Professional) {
    this._newScheduleService.professional = professional;
    this._router.navigate(['../data'], {
      relativeTo: this._activatedRoute,
    });
  }
}
