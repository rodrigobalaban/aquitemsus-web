import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/shared';
import { AuthService, MessageService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  returnUrl: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.form = this._formBuilder.group(this.buildFormControls());
    this.returnUrl = this._activatedRoute.snapshot.queryParams.return || '/';
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
      () => this._router.navigateByUrl(this.returnUrl),
      () => this._messageService.show('E-mail e/ou senha inválidos. Verifique!')
    );
  }
}
