import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent implements OnInit {
  
  constructor(
    // private authService: AuthService,
    // private router: Router
  ) { 
    //const currUser:any = this.authService.currentUserValue.role
    // if(currUser === 'user'){
    //   this.router.navigate(['/leads'])
    // }
  }

  ngOnInit(): void {
  }

}
