import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpResponse, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { ErrorDialogService } from '../error/services/error-dialog.service';

@Injectable()
export class UniversalHttpInterceptor implements HttpInterceptor {
    token: string;
    public result: any;
    constructor(private router: Router,
        private errorDialogService: ErrorDialogService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const obj = JSON.parse(localStorage.getItem('currentUser'));
            this.token = obj ? obj.token : null;
            req = this.token ? req.clone({setHeaders: { Authorization: `Bearer ${this.token}`}}) : req;
            return next.handle(req).do((event: HttpEvent<any>) => {
        }, (err: any) => {
           if (err instanceof HttpErrorResponse) {
             this.errorDialogService.open(err.status)
               .subscribe(res => this.result = res);
           }
        });
    }
}
