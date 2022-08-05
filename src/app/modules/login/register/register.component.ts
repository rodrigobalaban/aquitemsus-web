import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models';
import { MessageService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _router: Router,
    private _userService: UserService
  ) {
    this.form = this._formBuilder.group(this.buildFormControls());
  }

  buildFormControls() {
    return {
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      role: ['User', Validators.required],
    };
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: User = this.form.getRawValue();
    await this._userService.register(user);

    this._messageService.show('Cadastro realizado com sucesso');
    this._router.navigate(['/login']);
  }
}
