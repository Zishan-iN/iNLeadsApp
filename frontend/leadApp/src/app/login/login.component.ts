import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AlertMessageService } from '../services/alert-message.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  loading = false;
  error = '';
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  hidePassword: boolean = true;
  options = { autoClose: true, redirect: false, redirectLink: '' };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertMessageService,
    private router:Router
    ) {
    this.loginForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    })
  }

  ngOnInit(): void {
  }

  submit(){
    if(!this.loginForm.valid){
      return;
    }

    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(res=>{
        const role: any = res.role
        if(role ==='admin'){
          this.router.navigate(['/admin'])
        }
        if(role ==='user'){
          this.router.navigate(['/user'])
        }
      },err=>{
        this.alertService.error(err, this.options);
      })
    }
  }

  togglePassword(toggleString: string) {
    if (toggleString === 'hide') {
      this.hidePassword = true;
    } else {
      this.hidePassword = false;
    }
  }

}
