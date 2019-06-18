import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [AccountComponent, LoginComponent, RegistrationComponent],
  imports: [
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
