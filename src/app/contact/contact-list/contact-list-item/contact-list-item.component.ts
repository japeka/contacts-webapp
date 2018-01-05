import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../contact';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: Contact;
  @Output() contactRemoveSelected: EventEmitter<Contact>;
  constructor(private router: Router) {
    this.contactRemoveSelected = new EventEmitter();
  }

  ngOnInit() {}

  onRemoveSelect(contact) {
    this.contactRemoveSelected.emit(contact);
  }

}
