import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/services/aunthefication.service';
import { UserRole } from 'src/app/shared/models/appUser.model';

@Injectable()
export class LogOutAuthGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getUserData();
        debugger;
        if (!currentUser) {
            return true;
        }
        if(currentUser.role != UserRole.ADMIN){
            this.authenticationService.clear();
            return true;
        }
        this.router.navigate(['/dashboard']);
        return false;
    }
}