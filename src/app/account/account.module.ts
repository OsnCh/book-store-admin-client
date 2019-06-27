import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';
import { AuthenticationService } from '../services/aunthefication.service';

@NgModule({
  declarations: [AccountComponent, LoginComponent, RegistrationComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  providers: [AuthenticationService]
})
export class AccountModule { }
