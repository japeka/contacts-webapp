import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthenticationHttpService } from './authentication-http.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { Token } from '../token';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  user: User;
  public _token: string;
  constructor(private http: AuthenticationHttpService) {
    this.user = new User();
  }

  login(user: User): Observable<Token> {
    if (user.username && user.password && user.username.length > 3 && user.password.length > 3 ) {
      return this.http.authenticate(user).map( (token) => {
         localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token: token.access_token }));
         this._token = token.access_token;
         return token;
      });
    } else {
      return Observable.of(null);
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isAuthenticatedUser(): boolean {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    if (token && token.username && token.token) {
      return true;
    }
    return false;
  }

  getAuthenticatedUser(): User {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    if (token && token.username) {
      const parts = token.username.split('@');
      const names = parts[0].split('.');
      this.user.firstName = names[0] ? names[0] : 'Eric';
      this.user.lastName = names[1] ? names[1] : 'Hansen';
      this.user.username = token.username;
      this.user.password = '';
      return this.user;
    } else {
      return null;
    }
  }

}
