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
import { HoursComponent } from './new-schedule/hours/hours.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    NewScheduleComponent,
    SpecialtyComponent,
    ProfessionalComponent,
    DateComponent,
    HoursComponent,
    ScheduleListComponent,
    RatingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
  ],
})
export class ScheduleModule {}
