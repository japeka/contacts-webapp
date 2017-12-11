import { Component } from '@angular/core';
import {Router} from '@angular/router';

/* how to get data about user if logged or not from logincomponent */
/* using sharedservice? */
import { SharedService } from './shared/shared.service';
/*import { AuthenticationService } from './user/services/authentication.service';*/

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
    private sharedService: SharedService,
    private router: Router) {
    this.user = null; 
    sharedService.changeEmitted$.subscribe(
     _user => {
        this.user =_user;
    });
  }

  showContactsList(): void {
    this.router.navigate(['/contacts']);
  }
  
  addNewContact(): void {
    this.router.navigate(['/add-contact']);
  }
}
