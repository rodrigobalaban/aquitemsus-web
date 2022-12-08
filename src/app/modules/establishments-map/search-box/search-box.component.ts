import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  Establishment,
  EstablishmentCategory,
  Localization,
} from 'src/app/shared';
import { EstablishmentService } from '../services';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements AfterViewInit {
  @Input() localization!: Localization;
  @Output() onSelectEstablishment = new EventEmitter<Establishment>();

  @ViewChild('searchInput') searchInput!: ElementRef;

  searchControl = new FormControl();
  filteredEstablishments: Establishment[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private establishmentService: EstablishmentService
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchString) => this.filterEstablishments(searchString));
  }

  ngAfterViewInit(): void {
    const focusOnSearch = this.activatedRoute.snapshot.queryParams.search;

    if (focusOnSearch) {
      this.searchInput.nativeElement.focus();
    }

    this.cdRef.detectChanges();
  }

  private async filterEstablishments(search: string): Promise<void> {
    this.filteredEstablishments =
      await this.establishmentService.getAllEstablishments(
        search,
        this.localization,
        0,
        10
      );
  }

  emitEventEstablishmentSelected(establishment: Establishment): void {
    this.onSelectEstablishment.emit(establishment);
  }

  getIconSource(category: EstablishmentCategory): string {
    return this.establishmentService.getIconPathByCategory(category);
  }

  clearInput(): void {
    this.searchControl.setValue(null);
  }
}
