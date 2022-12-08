import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/shared';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit {
  user: UserToken;

  constructor(private _authService: AuthService, private _router: Router) {
    this.user = this._authService.getUserSession();
  }

  ngOnInit(): void {}

  logout() {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
