import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Establishment } from 'src/app/shared';
import { EstablishmentService } from '../services';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchControl = new FormControl();
  filteredEstablishments: Establishment[] = [];

  constructor(private establishmentService: EstablishmentService) {
    this.searchControl.valueChanges.subscribe((searchString) =>
      this._filterEstablishments(searchString)
    );
  }

  ngOnInit(): void {}

  private async _filterEstablishments(value: string): Promise<void> {
    this.filteredEstablishments =
      await this.establishmentService.getNearbyEstablishments();
  }
}
