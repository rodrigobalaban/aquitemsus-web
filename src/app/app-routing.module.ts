import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
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
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/home').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'agendamentos',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/schedule').then((m) => m.ScheduleModule),
      },
      {
        path: 'meu-perfil',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/my-profile').then((m) => m.MyProfileModule),
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
