import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
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
  constructor(private formBuilder: FormBuilder) {
    this.loginForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    })
  }

  ngOnInit(): void {
  }

  submit(){}

  togglePassword(toggleString: string) {
    if (toggleString === 'hide') {
      this.hidePassword = true;
    } else {
      this.hidePassword = false;
    }
  }

}
