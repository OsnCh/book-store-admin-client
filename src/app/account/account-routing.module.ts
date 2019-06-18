import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account.component';
import { LogOutAuthGuard } from '../core/guards/logOutAuth.guard';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/account/login', pathMatch: 'full'
  },
  {
    path: "", component: AccountComponent,
    children: [
      {
        path: 'login', component: LoginComponent, canActivate: [LogOutAuthGuard]
      },
      {
        path: 'registration', component: RegistrationComponent, canActivate: [LogOutAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }