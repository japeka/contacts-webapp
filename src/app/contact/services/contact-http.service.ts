import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../contact';
import 'rxjs/add/operator/map';

/* Tämä service hanskaa pelkästään vain http kutsujen käsittelyn */
@Injectable()
export class ContactHttpService {

  private url: string;
  constructor(private http: HttpClient) {
    // this.url = 'http://localhost:62753/api/contacts';
    this.url = environment.endpointUrl + '/contacts';
    console.log( this.url );
  }

  // get all contacts
  get(): Observable<Contact[]> {
    return this.http.get(this.url).map( (response) => {
      return response as Contact[];
    });
  }

  // get one by id
  getById(id: number): Observable<Contact> {
    return this.http.get(this.url + '/' + id).map( (response) => {
      return response as Contact;
    });
  }

  // create new contact
  create(contact: Contact): Observable<Contact> {
    return this.http.post(this.url, contact).map( (response) => {
      return response as Contact;
    });
  }

  // update an existing contact   /contacts/2
  update(contact: Contact): Observable<Contact> {
    return this.http.put(this.url + '/' + contact.id, contact).map( (response) => {
      return response as Contact;
    });
  }

  // delete contact
  delete(contact: Contact): Observable<Contact> {
    return this.http.delete(this.url + '/' + contact.id).map((response) => {
      return response as Contact;
    });
  }

}
