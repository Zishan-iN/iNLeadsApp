import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { 
    // const currUser:any = this.authService.currentUserValue.role
    // if(currUser === 'user'){
    //   this.router.navigate(['/leads'])
    // }
  }

  ngOnInit(): void {

  }

}
