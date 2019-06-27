import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/aunthefication.service';
import { SinginModel } from 'src/app/shared/models/auth/singin.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  private loginGroup: FormGroup

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) {}

  ngOnInit(){
    this.loginGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  public login(){
    let signIdModel = new SinginModel;
    signIdModel.email = this.loginGroup.controls['email'].value;
    signIdModel.password = this.loginGroup.controls['password'].value;
    this.authenticationService.logIn(signIdModel);
  }

}
