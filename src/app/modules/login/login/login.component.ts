import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/shared';
import { AuthService, MessageService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.form = this._formBuilder.group(this.buildFormControls());
  }

  buildFormControls() {
    return {
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const userLogin: UserLogin = this.form.getRawValue();
    this._authService.authenticate(userLogin).then(
      () => this._router.navigate(['/']),
      () => this._messageService.show('E-mail e/ou senha inválidos. Verifique!')
    );
  }
}
