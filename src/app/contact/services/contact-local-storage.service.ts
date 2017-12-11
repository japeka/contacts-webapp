import { Injectable } from '@angular/core';
import { Contact } from '../contact';
import * as _ from "lodash";

@Injectable()
export class ContactLocalStorageService {

  private contacts: Contact[];
  private avatars: string[][];
  private avatarUrl: string;

  constructor() {
    this.avatars = [['02','04','06','12','20','18'],['03','11','05','09','15','13']]; 
    this.avatarUrl = 'http://svgavatars.com/style/svg/';
    this.contacts = this.getContactsFromStorage();
  }

  addContactsToStorage() {
      if(this.contacts) {
        localStorage.removeItem('contacts');
        localStorage.setItem('contacts',JSON.stringify(this.contacts));
      } else {
        localStorage.removeItem('contacts');
      }
  }

  getContactsFromStorage(): Contact[] {
    if (typeof(Storage) !== "undefined") {
      if(localStorage.getItem('contacts') != null) {
        return JSON.parse(localStorage.getItem('contacts'));
      }
    } 
    return [];
  }

  getAvatarPicture(gender: number) {
    let position = Math.floor(Math.random() * 6);
    return this.avatarUrl + this.avatars[gender][position] + '.svg';
  }
   
  getContacts(): Contact[] {
    var json = JSON.stringify(this.contacts);
    return this.contacts || [];
  }

  deleteContact(contact: Contact): void {
    this.contacts.splice(_.findIndex(this.contacts, function(o) { return o.id == contact.id; }),1);
    this.addContactsToStorage();
  }

 addContact(contact: Contact): void {
    if(this.contacts.length > 0) {
      var k = 0;
      k = _.maxBy(this.contacts, function(o) { return o.id; }).id;
      k++;contact.id = k;
      contact.avatar = this.getAvatarPicture(contact.gender);
      this.contacts.push(Object.assign({}, contact));
    } else {
      contact.id = 0;
      this.contacts.push(Object.assign({}, new Contact(contact.id,contact.firstName, contact.lastName,
      contact.phone,contact.gender,this.getAvatarPicture(contact.gender),contact.streetAddress, contact.city)));
    }
    this.addContactsToStorage();
 }
   
 genderIsSame(id: number, _gender: number): Boolean {
    var _contacts = this.getContactsFromStorage();
    let position = _.findIndex(_contacts, function(o) { return o.id == id; });
    return _contacts[position].gender === _gender;
  }

  updateContact(contact: Contact): void {
    if(this.contacts.length > 0) {
      let position = _.findIndex(this.contacts, function(o) { return o.id == contact.id; });
      if(!this.genderIsSame(contact.id, contact.gender)) {
        contact.avatar = this.getAvatarPicture(contact.gender);      
      }
      this.contacts[position] = contact;
      this.addContactsToStorage();
    }
  }

  findContactById(id: number): Contact {
    let position = _.findIndex(this.contacts, function(o) { return o.id == id; });
    return this.contacts[position];    
  }

}
