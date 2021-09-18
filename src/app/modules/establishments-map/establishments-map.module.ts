import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstablishmentsMapRoutingModule } from './establishments-map-routing.module';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    EstablishmentsMapRoutingModule
  ]
})
export class EstablishmentsMapModule { }
