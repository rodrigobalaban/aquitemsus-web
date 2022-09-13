import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSUS, UserToken } from 'src/app/shared';
import { AuthService, MessageService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss'],
})
export class MyDataComponent implements OnInit {
  form: FormGroup;
  userToken: UserToken;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _router: Router,
    private _userService: UserService
  ) {
    this.form = this._formBuilder.group(this.buildFormControls());
    this.userToken = this._authService.getUserSession();
  }

  async ngOnInit(): Promise<void> {
    const user = await this._userService.getById(this.userToken.id!);
    this.patchValue(user);
  }

  buildFormControls() {
    return {
      id: [null],
      name: [null, [Validators.minLength(3), Validators.required]],
      email: [null, [Validators.email, Validators.required]],
    };
  }

  patchValue(user: UserSUS) {
    this.form.patchValue(user);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: UserSUS = this.form.getRawValue();

    await this._userService.update(user.id!, user);

    this._messageService.show('Dados atualizados com sucesso!');
    this.navigateToProfileList();
  }

  navigateToProfileList() {
    this._router.navigate(['/meu-perfil']);
  }
}
