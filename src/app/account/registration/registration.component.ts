import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Constants } from 'src/app/common/constants';
import { ErrorStateMatcher } from '@angular/material/core';
import { AccountService } from 'src/app/services/account.service';
import { SignUpAuthModel } from 'src/app/shared/models/auth/signUp.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.hasError('repeatPasswordInvalid');
  }
}

function getControlFunc(formGroup: FormGroup, name: string) {
  return formGroup.controls[name];
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private registrationGroup: FormGroup;
  private matcher = new MyErrorStateMatcher();
  private showError: boolean = false;
  private changeControlKeys: Array<string>;

  constructor(private formBuilder: FormBuilder, 
    private accountService: AccountService, 
    private toastService: ToastrService,
    private router: Router) {
    this.changeControlKeys = new Array<string>();
  }

  ngOnInit() {
    this.registrationGroup = this.formBuilder.group({
      firstName: ['', [Validators.required,
      Validators.minLength(4)]],
      lastName: ['', [Validators.required,
      Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required,
      Validators.pattern(Constants.passwordPattern)])],
      repeatPassword: ['', [Validators.required]]
    }, { validators: this.repeatPasswordValidate });

    for (const key of Object.keys(this.registrationGroup.controls)) {
      this.registrationGroup.controls[key].valueChanges
        .subscribe(value => {
          if (!this.changeControlKeys.find((v) => v == key)) {
            this.changeControlKeys.push(key);
            this.registrationGroup.updateValueAndValidity();
          }
        });
    }
  }

  private repeatPasswordValidate(formGroup: FormGroup) {
    let passwordCntrl = getControlFunc(formGroup, 'password');
    let repeatPasswordCntrl = getControlFunc(formGroup, 'repeatPassword');
    if (!passwordCntrl || !repeatPasswordCntrl ||
      passwordCntrl.value != repeatPasswordCntrl.value) {
      return { repeatPasswordInvalid: true }
    }
    return null;
  }

  private getControl(name: string) {
    return getControlFunc(this.registrationGroup, name);
  }

  private isControlChanged(key: string): boolean {
    if (this.changeControlKeys.find(v => v == key)) {
      return true;
    }
    return false;
  }

  private submitRegistration(){
    if(this.registrationGroup.invalid){
      return;
    }

    let registrationModel = new SignUpAuthModel;
    registrationModel.firstName = this.getControl('firstName').value;
    registrationModel.lastName = this.getControl('lastName').value;
    registrationModel.email = this.getControl('email').value;
    registrationModel.password = this.getControl('password').value;

    this.accountService.registration(registrationModel).subscribe((message) => {
      this.toastService.success(message);
      this.router.navigate(['/account', 'login']);
    });
  } 

}
