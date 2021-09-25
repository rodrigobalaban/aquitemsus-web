import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EstablishmentsMapRoutingModule } from './establishments-map-routing.module';
import { MapComponent } from './map/map.component';
import { SearchBoxComponent } from './search-box/search-box.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapComponent, SearchBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    EstablishmentsMapRoutingModule,
  ],
})
export class EstablishmentsMapModule {}
