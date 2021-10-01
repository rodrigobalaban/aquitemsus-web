import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Establishment } from 'src/app/shared';
import { EstablishmentService } from '../services';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Output() onSelectEstablishment = new EventEmitter<Establishment>();

  searchControl = new FormControl();
  filteredEstablishments: Establishment[] = [];

  constructor(private establishmentService: EstablishmentService) {
    this.searchControl.valueChanges.subscribe((searchString) =>
      this.filterEstablishments(searchString)
    );
  }

  ngOnInit(): void {}

  private async filterEstablishments(value: string): Promise<void> {
    this.filteredEstablishments =
      await this.establishmentService.getNearbyEstablishments();
  }

  emitEventEstablishmentSelected(establishment: Establishment): void {
    this.onSelectEstablishment.emit(establishment);
  }
}
