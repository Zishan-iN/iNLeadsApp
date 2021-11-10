import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ComparePassword } from '../auth/custome-validator.validator';
import { AlertMessageService } from '../services/alert-message.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!:FormGroup
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  hidePassword: boolean = true;
  options = { autoClose: true, redirect: false, redirectLink: '' };
  token: any;
  showNewPassword=true;
  showConfirmPassword=true;
  show: boolean = false;
  constructor(
    private authService: AuthService,
    private alertService: AlertMessageService,
    private activeRout: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.activeRout.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    },
    {
      // Used custom form validator name
      validator: ComparePassword("password", "confirmPassword")
    })
   }

  ngOnInit(): void {
  }

  submit(){
    if(!this.resetPasswordForm.valid){
      return
    }
    if(this.resetPasswordForm.valid){
      const token = this.token
      const passowrd = this.resetPasswordForm.get('password')?.value;
      this.authService.resetPassword(passowrd, token).subscribe(res=>{
        this.options.autoClose = true;
        this.options.redirect = true;
        this.options.redirectLink = '/login';
        this.alertService.success(res.message, this.options);
      },error=>{
        this.options.autoClose = true;
        this.alertService.error(error, this.options);
      })
    }
  }

  togglePassword(toggleString: string, findFieldString: string) {
    if (findFieldString === 'new') {
      if (toggleString === 'hide') {
        this.showNewPassword = true;
      }
      else {
        this.showNewPassword = false;
      }
    } else {
      if (toggleString === 'hide') {
        this.showConfirmPassword = true;
      }
      else {
        this.showConfirmPassword = false;
      }
    }
  }

  showStrengthmeter(){
    this.show = true;
  }

}
