import { HttpInterceptor, HttpErrorResponse, HttpResponse,HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Contact} from '../contact';
import 'rxjs/add/operator/do';

/*
  Just testing...HttpInterceptor  Angular logic
*/
export class ContactHttpInterceptor implements HttpInterceptor {
    private router: Router;
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /* return next.handle(req); */
        return next.handle(req).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              //do stuff with response if you want
              console.log("ContactHttpInterceptor luokassa tulostetaan request");
              console.log(req);
            }
          }, (err: any) => {
                //if (err instanceof HttpErrorResponse) {}
                console.log("errors detected");
                console.log("err.status " + err.status );
                console.log("forwarding...to login page");
                this.router.navigate(['/login']);
          });        
    }   
}