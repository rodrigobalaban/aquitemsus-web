import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private establishmentService: EstablishmentService
  ) {
    this.getEstablishmentDetails(data.establishment);
  }

  async getEstablishmentDetails(establishment: Establishment): Promise<void> {
    this.establishment = this.establishmentService.getEstablishmentbyId(
      establishment.id
    );
  }

  getWeekdayDescription(dayOfWeek: number): string {
    let dayDescription = '';

    switch (dayOfWeek) {
      case 0: {
        dayDescription = 'Domingo';
        break;
      }
      case 1: {
        dayDescription = 'Segunda';
        break;
      }
      case 2: {
        dayDescription = 'Terça';
        break;
      }
      case 3: {
        dayDescription = 'Quarta';
        break;
      }
      case 4: {
        dayDescription = 'Quinta';
        break;
      }
      case 5: {
        dayDescription = 'Sexta';
        break;
      }
      case 6: {
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
}
