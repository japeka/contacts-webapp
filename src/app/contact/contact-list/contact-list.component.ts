import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { ContactService } from '../services/contact.service';
//import { ContactLocalStorageService } from '../services/contact-local-storage.service';
import * as _ from "lodash";
import { Contact } from '../contact';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  title: string;
  contacts: Contact[];
  contact: Contact;
  contactSelected: Contact;

  constructor(private contactService: ContactService,
      private router: Router) {
      this.title = 'Contacts List';
      this.contact = new Contact();
      this.contacts = []; 
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }, 
      err => {
        console.log("Error happened!");
        return this.router.navigate(['/login']);
      }
    );
  }

  onContactSelect( contact: Contact ) {
    this.contactSelected = contact;
  }

  onRemoveSelect( _contact: Contact ) {
    this.contactService.deleteContact(_contact).subscribe( 
      (contact: Contact) => { 
        this.contactSelected = null;
    },
    err => {
      alert('Error Code: ' + err.status + ' received. Contact was not removed.');
    });
  }

  addNewContact(): void {
    this.router.navigate(['/add-contact']);
  }
}
