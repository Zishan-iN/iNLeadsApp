import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertMessageService } from '../services/alert-message.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup
  options = { autoClose: true, redirect: false, redirectLink: '' };
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertMessageService
  ) { 
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
  }

  submit(){
    if(!this.forgotPasswordForm.valid){
      return;
    }
    if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm.value)
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(res=>{
        console.log("Res", res)
        if (res.status === 'success') {
          this.options.autoClose = true;
          this.alertService.success(res.message, this.options);
          this.forgotPasswordForm.reset();
        }
      }, err=>{
        console.log(err)
        this.options.autoClose = true;
        this.alertService.error(err, this.options);
      })
    }
  }

}
