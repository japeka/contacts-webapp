import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { Token } from '../token';

@Injectable()
export class AuthenticationHttpService {

  private url: string;

  constructor(private http: HttpClient) {
     this.url = environment.endpointUrl + '/authenticate';
  }

  authenticate(user: User): Observable<Token> {
     return this.http.post(this.url, user).map( (response) => {
        return response as Token;
     });
  }

  getUserIdentity(): Observable<User> {
     return this.http.get(environment.endpointUrl + '/user').map( (response) => {
        return response as User;
     });
  }

}
