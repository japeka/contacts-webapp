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
      return this.http.authenticate(user).map( (token) => {
         localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token: token.access_token }));
         this._token = token.access_token;
         return token;
      });
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

  getAuthenticatedUser(): Observable<User> {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    if (token && token.username) {
      return this.http.getUserIdentity().map( (user) => {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify({ username: token.username,
              firstName: user.firstName, lastName: user.lastName,
                token: token.token }));
        return user;
     });
    } else {
      return Observable.of(null);
    }
  }

}
