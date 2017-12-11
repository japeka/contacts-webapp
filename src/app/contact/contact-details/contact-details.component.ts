import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { ContactLocalStorageService } from '../services/contact-local-storage.service';
import { ContactService } from '../services/contact.service'; 
import { Contact } from '../contact'; 

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  
  contact: Contact;
  btnName: string;
  isInValidInput: Boolean;
  errorMessage: String;
  showRemoveBtn: Boolean;
  breakpointObserver: BreakpointObserver;
  isSmallScreen: Boolean;

  constructor(
      private contactService: ContactService,
      private route: ActivatedRoute,
      private router: Router,
      public sanitizer: DomSanitizer,
      breakpointObserver: BreakpointObserver    
  ) {
      this.contact = new Contact(); 
      this.isInValidInput = false;
      this.errorMessage = "";
      this.btnName = "Add New Contact";
      this.showRemoveBtn= false;
      this.isSmallScreen = false;
      this.breakpointObserver = breakpointObserver;
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 584px)'
    ]).subscribe( result => { this.isSmallScreen = result.matches; });
    let id = this.route.snapshot.paramMap.get('id');
    if(id!==null) { //find the existing contact
      this.contactService.findContactById(Number(id)).subscribe( (contact) => {
        this.contact = contact; 
      });
      this.btnName = "Edit Contact";
      this.showRemoveBtn= true;
    } 
  }

  onClickContactEvent(): void {
    // add a new contact //
    if(!this.contact.id) { 
      if(this.contact.firstName && this.contact.lastName && this.contact.phone && this.contact.gender
        && this.contact.streetAddress && this.contact.city) {
          if(!this.isValidPhoneNumber(this.contact.phone)) {
            this.errorMessage = "Please provide valid phone number. 01-234567 for instance.";
            this.isInValidInput = true;      
          } else {
            this.contactService.addContact(this.contact)
              .subscribe((_contact) => {
                let cId = _contact.id;
                this.contact.firstName = "";
                this.contact.lastName = "";
                this.contact.phone = "";
                this.contact.streetAddress = "";
                this.contact.city = "";
                this.contact.avatar = "";
                this.isInValidInput = false;
                this.router.navigate(['/contacts']);
              },
              err => {
                this.errorMessage = 'Error Code: ' + err.status + ' received. New contact was not created.';
                this.isInValidInput = true;      
              });
          }
        } else {
          this.errorMessage = "Please provide input for your firstname, lastname, phone number, gender, street address and city";
          this.isInValidInput = true;      
        }
    // update an existing contact //
    } else {
      if(!this.isValidPhoneNumber(this.contact.phone)) {
        this.errorMessage = "Please provide valid phone number. 01-234567 for instance.";
        this.isInValidInput = true;      
      } else {
        this.contactService.updateContact(this.contact)
         .subscribe( (_contact) => {
            this.router.navigate(['/contacts']);
         },
         err => {
            this.errorMessage = 'Error Code: ' + err.status + ' received. Contact was not updated.';
            this.isInValidInput = true;      
         });
      }
    }
  }

  onContactRemove(): void {
    this.contactService.deleteContact(this.contact)
      .subscribe((_contact) => {
        this.router.navigate(['/contacts']);
      },
      err => {
        this.errorMessage = 'Error Code: ' + err.status + ' received. Contact was not removed.';
        this.isInValidInput = true;      
      }
    );
    this.router.navigate(['/contacts']);
  }

  isValidPhoneNumber(number: string): Boolean {
    if(number) {
      return /^\d{2,3}-?\d{4,15}$/.test(number);
    } else {
      return false;
    }
  }

}
