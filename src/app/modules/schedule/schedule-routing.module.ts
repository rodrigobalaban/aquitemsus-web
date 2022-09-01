import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DateComponent,
  HoursComponent,
  NewScheduleComponent,
  ProfessionalComponent,
  SpecialtyComponent,
} from './new-schedule';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
