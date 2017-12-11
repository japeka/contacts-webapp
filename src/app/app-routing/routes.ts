import { Routes } from '@angular/router';

import { ContactListComponent } from '../contact/contact-list/contact-list.component';
import { ContactListItemComponent } from '../contact/contact-list/contact-list-item/contact-list-item.component';
import { ContactDetailsComponent } from '../contact/contact-details/contact-details.component';
import { LoginComponent } from '../user/login/login.component';
import { AuthenticationGuard } from '../guard/authentication.guard';

export const routes: Routes = [
    {   path: '', 
        component: LoginComponent
    },
    {   path: 'login',
        component: LoginComponent
    },
    { 
        path: 'contacts', 
        component: ContactListComponent,
        canActivate: [AuthenticationGuard]
    },
    { 
        path: 'add-contact',
        component: ContactDetailsComponent,
        canActivate: [AuthenticationGuard]
    },
    { 
        path: 'contacts/:id', 
        component: ContactDetailsComponent,
        canActivate: [AuthenticationGuard]
    }
];
  