import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DateComponent,
  HoursComponent,
  NewScheduleComponent,
  ProfessionalComponent,
  SpecialtyComponent,
} from './new-schedule';
import { RatingComponent } from './rating';
import { ScheduleListComponent } from './schedule-list';

const routes: Routes = [
  {
    path: '',
    component: ScheduleListComponent,
  },
  {
    path: 'novo',
    component: NewScheduleComponent,
    children: [
      { path: 'especialidade', component: SpecialtyComponent },
      { path: 'profissional', component: ProfessionalComponent },
      { path: 'data', component: DateComponent },
      { path: 'hora', component: HoursComponent },
    ],
  },
  {
    path: 'avaliar',
    children: [
      {
        path: ':id',
        component: RatingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
