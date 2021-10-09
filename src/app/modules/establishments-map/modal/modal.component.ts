import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Establishment } from 'src/app/shared';

export interface DialogData {
  establishment: Establishment;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  establishment: Establishment;

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData) {
    this.establishment = data.establishment;
  }

  getWeekdayDescription(dayOfWeek: number): string {
    switch (dayOfWeek) {
      case 0: {
        return 'Domingo';
      }
      case 1: {
        return 'Segunda';
      }
      case 2: {
        return 'Terça';
      }
      case 3: {
        return 'Quarta';
      }
      case 4: {
        return 'Quinta';
      }
      case 5: {
        return 'Sexta';
      }
      case 6: {
        return 'Sábado';
      }
    }

    return '';
  }
}
