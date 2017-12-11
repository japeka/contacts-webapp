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
  user: User;
  constructor(private authenticationService: AuthenticationService,
    private sharedService: SharedService,
    private router: Router) { 
     this.user = new User("demo@demo.com","password","Teppo","Testaaja");   
  }

  ngOnInit() {
  }
  
  onLoginEvent(): void {
    if(this.authenticationService.login(this.user)) {
      this.sharedService.emitChange(this.user);
      this.router.navigate(['/contacts']);
    } 
  }
}
