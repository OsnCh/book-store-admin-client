import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt from 'jsonwebtoken';
import { AppUserModel } from '../shared/models/appUser.model';
import { CookieService } from 'ngx-cookie-service';
import { SinginModel } from '../shared/models/auth/singin.model';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(
        private route: ActivatedRoute,
        private accountService: AccountService,
        private router: Router,
        private cokieService: CookieService) { }

    logIn(sigInModel: SinginModel) {
        this.accountService.login(sigInModel).subscribe((response) => {
            this.saveUserByToken(response.accessToken);
            console.log(this.route.snapshot);

            let returnUrl = this.route.snapshot.queryParams['returnUrl']
                || '/dashboard';
            debugger;
            this.router.navigateByUrl(returnUrl);
        })
    }

    logOut() {
        this.clear();
        this.router.navigate(['/account','login'], 
            { queryParams: { returnUrl :  this.router.url} });
            debugger;
        console.log(this.router.url);
    }

    saveUserData(user: AppUserModel) {
        this.cokieService.set('user', JSON.stringify(user));
    }

    getUserData(): AppUserModel {
        try {
            let user = JSON.parse(this.cokieService.get('user'));
            return this.validateUser(user);
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    getToken(): string {
        try {
            const token = this.cokieService.get('token');
            if(!token){
                return null;
            }
            if (this.isTokenExpired(token)) {
                this.logOut();
                throw new Error("Token is expired")
            }
            return token;
        } catch{
            return null;
        }
    }

    clear(){
        this.cokieService.set('user', '');
        this.cokieService.set('token', '');
    }

    private validateUser(userObj: any): AppUserModel {
        if (!userObj || !userObj.role) {
            throw new Error('User not found.');
        }

        return userObj;
    }

    saveUserByToken(token: string) {
        this.cokieService.set('token', token);
        let user = this.validateUser(this.decodeToken(token));
        this.saveUserData(user);
    }

    private decodeToken(
        token: string,
        options?: jwt.DecodeOptions
    ): null | { [key: string]: any } | string {
        return jwt.decode(token, options);
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = this.decodeToken(token) as any;

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }
}