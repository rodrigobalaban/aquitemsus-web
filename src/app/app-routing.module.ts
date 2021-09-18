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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
