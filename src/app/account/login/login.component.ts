import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from 'src/app/services/aunthefication.service';
import { Router } from '@angular/router';
import { SinginModel } from 'src/app/shared/models/auth/singin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  constructor(
    private authenticationService: AuthenticationService) {}

  email:string;
  password:string;

  public login(){
    let signIdModel = new SinginModel;
    signIdModel.email = this.email;
    signIdModel.password = this.password;
    this.authenticationService.logIn(signIdModel);
  }

}
