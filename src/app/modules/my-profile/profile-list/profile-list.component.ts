import { Component, OnInit } from '@angular/core';
import { UserToken } from 'src/app/shared';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  user: UserToken;

  constructor(private _authService: AuthService) {
    this.user = this._authService.getUserSession();
  }

  ngOnInit(): void {}
}
