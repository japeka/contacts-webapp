import { Injectable } from '@angular/core';
import { ContactLocalStorageService } from './contact-local-storage.service';
import { ContactHttpService } from './contact-http.service';
import { Contact } from '../contact';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as _ from "lodash";

/* business logiikka kehitetään tänne */ 
@Injectable()
export class ContactService {

  private contacts: Contact[];
  constructor(
    private contactLocalStorageService: ContactLocalStorageService, 
    private httpService: ContactHttpService ) {
      this.contacts = [];
  }

  getContacts(): Observable<Contact[]> {
    if (_.isEmpty(this.contacts)) {
      return this.httpService.get().map((contacts) => {
        this.contacts = contacts;
        return contacts;
      });  
    } else {
      return Observable.of(this.contacts);
    }
  }

  findContactById(id: number): Observable<Contact> {
    let cachedContact = _.find(this.contacts, {id:id});
    if(cachedContact) {
      return Observable.of(cachedContact);
    } else {
      return this.httpService.getById(id).map( (contact) => {
        this.contacts.push(contact);
        return contact;
      });
    }
  }

  addContact(_contact: Contact): Observable<Contact> {
    return this.httpService.create(_contact).map( (contact) => {
      this.contacts.push(contact);
      return contact;
    });
  }

  updateContact(_contact: Contact): Observable<Contact> {
    return this.httpService.update(_contact).map( (contact) => {
        let position = _.findIndex(this.contacts, function(o) { return o.id == contact.id; });
        this.contacts[position] = contact;
        return contact;
    });
  }

  deleteContact(_contact: Contact): Observable<Contact> {
    return this.httpService.delete(_contact).map( (contact) => {
      var idx = _.findIndex(this.contacts, function(o) { return o.id == contact.id; });
      var item = this.contacts.splice(idx,1);
      return contact;      
    });
  }

}
