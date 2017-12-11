// @angular modules //
import { BrowserModule } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';
import { MatExpansionModule, MatCardModule, MatRadioModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

// lodash //
import * as _ from 'lodash';

// routing //
import { AppRoutingModule } from './app-routing/app-routing.module';

// components //
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactListItemComponent } from './contact/contact-list/contact-list-item/contact-list-item.component';
import { ContactDetailsComponent } from './contact/contact-details/contact-details.component';
import { MapComponent } from './map/map/map.component';
import { LoginComponent } from './user/login/login.component';

// services //
import { ContactLocalStorageService } from './contact/services/contact-local-storage.service';
import { ContactService } from './contact/services/contact.service';
import { ContactHttpService } from './contact/services/contact-http.service';
import { AuthenticationService } from './user/services/authentication.service';
import { SharedService } from './shared/shared.service';

// interceptors testing //
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContactHttpInterceptor } from './contact/services/contact.interceptor';

// guard //
import { AuthenticationGuard } from './guard/authentication.guard';

// pipes //
import { NgPipesModule } from 'ngx-pipes';
import { ContactAddressPipe } from './contact/pipes/contact-address.pipe';
import { SafePipe } from './contact/pipes/safe.pipe';
import { CustomSortPipe } from './contact/pipes/custom-sort.pipe';

// App.Module //
@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent,
    ContactDetailsComponent,
    ContactAddressPipe,
    SafePipe,
    MapComponent,
    CustomSortPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatRadioModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    FlexLayoutModule,
    LayoutModule,
    AppRoutingModule,
    NgPipesModule
  ],
  providers: [
    ContactLocalStorageService,
    ContactService,
    ContactHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContactHttpInterceptor,
      multi: true
    },
    AuthenticationService,
    AuthenticationGuard,
    SharedService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
