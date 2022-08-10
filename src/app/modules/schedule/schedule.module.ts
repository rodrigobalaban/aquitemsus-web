import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { NewScheduleComponent } from './new-schedule';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { SpecialtyComponent } from './new-schedule/specialty/specialty.component';
import { ProfessionalComponent } from './new-schedule/professional/professional.component';
import { DateComponent } from './new-schedule/date/date.component';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    NewScheduleComponent,
    SpecialtyComponent,
    ProfessionalComponent,
    DateComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
