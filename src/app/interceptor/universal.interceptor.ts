import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpResponse, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class UniversalHttpInterceptor implements HttpInterceptor {
    token: string;
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const obj = JSON.parse(localStorage.getItem('currentUser'));
            this.token = obj ? obj.token : null;
            req = this.token ? req.clone({setHeaders: { Authorization: `Bearer ${this.token}`}}) : req;
            return next.handle(req).do((event: HttpEvent<any>) => {
        }, (err: any) => {
           if (err instanceof HttpErrorResponse) {
               if (err.status === 401 ) {
                 this.router.navigate(['/login']);
               } else {
                 this.router.navigate(['/error/' + err.status]);
               }
           }
        });
    }
}