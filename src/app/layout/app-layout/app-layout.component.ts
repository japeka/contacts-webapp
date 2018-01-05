import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../user/services/authentication.service';
import { SharedService } from '../../shared/shared.service';
import { User } from '../../user/user';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  title = 'Contacts App';
  user: User;

  constructor(
       private router: Router,
        private sharedService: SharedService,
      private authService: AuthenticationService ) {
        sharedService.changeEmitted$.subscribe(
            user_ => {
            this.user = user_;
        });
        const _user = this.authService.getAuthenticatedUser();
        this.user = _user ? _user : null;
   }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showContactsList(): void {
    this.router.navigate(['/ca/contacts']);
  }

  addNewContact(): void {
    this.router.navigate(['/ca/add-contact']);
  }


}
