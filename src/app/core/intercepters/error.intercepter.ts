import { Injectable, ErrorHandler } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/aunthefication.service';
import 'rxjs/add/observable/empty';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor{
    constructor(private authenticationService: AuthenticationService,
        private toastService: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let errorMessage = '';
            if(err.status == 401){ 
                errorMessage = 'Session time is over.'
                this.authenticationService.logOut(); 
            }
            if(err.status == 403){ errorMessage = 'Access is denied.' }

            if(!err || !errorMessage || err.status == 500)
                { errorMessage = (err.error)? err.error : "Internal Server Error."}

            this.toastService.error(errorMessage);
            const error = err.statusText;
            throw new Error(error);
        }))
    }
}