import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ComparePassword } from 'src/app/auth/custome-validator.validator';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  showNewPassword = true;
  showConfirmPassword = true;
  options = { autoClose: false, redirect: false, redirectLink: '' };
  show: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertMessageService,
    private router:Router
  ) {
    this.changePasswordForm =this.formBuilder.group({
      oldpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required]]
    },{ validator: ComparePassword("password", "confirmPassword") }
    )
  }

  ngOnInit(): void {
  }

  submit(){
    if(!this.changePasswordForm.valid){
      return
    }
    if(this.changePasswordForm.valid){
      let data:any={}
      data.password = this.changePasswordForm.get('password')?.value
      data.oldpassword = this.changePasswordForm.get('oldpassword')?.value
      this.authService.changePassword(data).subscribe(res=>{ 
        console.log('Res', res)
        if(res.status==='success'){
          this.options.autoClose = true;
          this.options.redirect =true;
          this.options.redirectLink = '/login'
          this.alertService.success(res.message, this.options)
          setTimeout(() => {
            this.authService.logout()
            this.router.navigate(['/login'])
          }, 5000);
        }
      },error=>{
          console.log('Er',error.error.message)
          this.options.autoClose = true;
          this.alertService.error(error.error.message, this.options)
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
