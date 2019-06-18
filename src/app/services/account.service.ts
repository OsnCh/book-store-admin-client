import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SinginModel } from '../shared/models/auth/singin.model';
import { TokenAuthModel } from '../shared/models/auth/tokenAuth.model';
import { environment } from 'src/environments/environment';
import { SignUpAuthModel } from '../shared/models/auth/signUp.model';

@Injectable({providedIn: 'root'})
export class AccountService {

    constructor(private httpClient: HttpClient){
        
    }

    public login(model: SinginModel): Observable<TokenAuthModel> {
        return this.httpClient.post<TokenAuthModel>(`${environment.apiUrl}auth/signin`, model);
    }

    public registration(model:SignUpAuthModel): Observable<string>{
        return this.httpClient.post(`${environment.apiUrl}auth/signup`, model, {responseType: 'text'});
    }
}