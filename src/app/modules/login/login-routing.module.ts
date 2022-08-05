import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { LoginComponent } from './login';
import { RecoverPasswordComponent } from './recover-password';
import { RegisterComponent } from './register';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'cadastre-se', component: RegisterComponent },
      { path: 'recuperar-senha', component: RecoverPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
