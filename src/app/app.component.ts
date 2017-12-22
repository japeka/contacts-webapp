import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './user/services/authentication.service';
import { SharedService } from './shared/shared.service';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Contacts App';

  user: User;
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthenticationService) {

    sharedService.changeEmitted$.subscribe(
        user_ => {
        this.user = user_;
    });
    const _user = this.authService.getAuthenticatedUser();
    this.user = _user ? _user : null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showContactsList(): void {
    this.router.navigate(['/contacts']);
  }

  addNewContact(): void {
    this.router.navigate(['/add-contact']);
  }
}
