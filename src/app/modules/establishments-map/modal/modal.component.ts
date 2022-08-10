import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Establishment, Specialty } from 'src/app/shared';
import { EstablishmentService } from '../services';

export interface DialogData {
  establishment: Establishment;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  establishment!: Promise<Establishment>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogRef: MatDialogRef<ModalComponent>,
    private _establishmentService: EstablishmentService,
    private _router: Router
  ) {
    this.getEstablishmentDetails(data.establishment);
  }

  async getEstablishmentDetails(establishment: Establishment): Promise<void> {
    this.establishment = this._establishmentService.getEstablishmentbyId(
      establishment.id
    );
  }

  getWeekdayDescription(dayOfWeek: string): string {
    let dayDescription = '';

    switch (dayOfWeek) {
      case 'Sunday': {
        dayDescription = 'Domingo';
        break;
      }
      case 'Monday': {
        dayDescription = 'Segunda';
        break;
      }
      case 'Tuesday': {
        dayDescription = 'Terça';
        break;
      }
      case 'Wednesday': {
        dayDescription = 'Quarta';
        break;
      }
      case 'Thursday': {
        dayDescription = 'Quinta';
        break;
      }
      case 'Friday': {
        dayDescription = 'Sexta';
        break;
      }
      case 'Saturday': {
        dayDescription = 'Sábado';
        break;
      }
    }

    return dayDescription;
  }

  getSpecialtyIcon(specialty: Specialty): string {
    let path = 'assets/icons/specialties/';

    switch (specialty.id) {
      case 2:
        path += 'pediatria.png';
        break;
      case 3:
        path += 'ginecologia.png';
        break;
      case 4:
        path += 'odontologia.png';
        break;
      default:
        path += 'clinica-geral.png';
        break;
    }

    return path;
  }

  scheduleAppointment(id: number): void {
    this.closeDialog();
    this._router.navigate(['agendamentos', 'novo'], {
      queryParams: { estabelecimento: id },
    });
  }

  closeDialog(): void {
    this._dialogRef.close();
  }
}
