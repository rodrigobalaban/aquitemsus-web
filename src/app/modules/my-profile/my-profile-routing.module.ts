import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDataComponent } from './my-data';
import { ProfileListComponent } from './profile-list';

const routes: Routes = [
  {
    path: '',
    component: ProfileListComponent,
  },
  {
    path: 'meus-dados',
    component: MyDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfileRoutingModule {}
