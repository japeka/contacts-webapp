import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable()
export class AuthenticationService {

  user: User;
  userAuthenticatedUser: boolean;
  constructor() {
    this.user = new User("demo@demo.com","password","teppo","testaaja");
    this.userAuthenticatedUser = false;
  }

  login(user: User): Boolean {
    if(user.userName === this.user.userName && user.password === this.user.password) {
      this.userAuthenticatedUser = true;
      return true;
    }        
    this.userAuthenticatedUser = false;
    return false;
  }

  logout(): void {
    this.userAuthenticatedUser = false;
  }

  isAuthenticatedUser(): boolean {
    return this.userAuthenticatedUser;
  }

  getAuthenticatedUser(): User {
    return this.user;
  }

}
