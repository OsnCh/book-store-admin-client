import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/aunthefication.service';
import { Observable } from 'rxjs';

@Injectable()
export class ApiIntercepter implements HttpInterceptor {

    constructor(private authService:AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {    
            let headers = new HttpHeaders({
                'Content-Type': 'application/json' 
            });
            let token = this.authService.getToken();
            if(token){
                 headers = headers.append('Authorization', `Bearer ${token}`);
            }
            let cloneReq = req.clone({
                headers: headers
            })
        return next.handle(cloneReq);
    }
}