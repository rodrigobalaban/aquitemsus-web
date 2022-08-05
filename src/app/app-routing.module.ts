import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenWithToolbarComponent } from './layout';

const routes: Routes = [
  {
    path: '',
    component: ScreenWithToolbarComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/establishments-map').then(
            (m) => m.EstablishmentsMapModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./modules').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
