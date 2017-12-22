import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { SharedService } from '../../shared/shared.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: any = {};
  _user: User;
  loginFailed: boolean;
  constructor(private authenticationService: AuthenticationService,
    private sharedService: SharedService,
    private router: Router) {
      this.loginFailed = false;
      this._user = new User();
  }

  ngOnInit() {}

  onLoginEvent(): void {
    this.authenticationService.login(this.user)
      .subscribe( token => {
        if (token && token.access_token ) {
          this.loginFailed = false;
          this.sharedService.emitChange(this.authenticationService.getAuthenticatedUser());
          this.router.navigate(['/contacts']);
        } else {
          this.loginFailed = true;
        }
      });

  }
}
