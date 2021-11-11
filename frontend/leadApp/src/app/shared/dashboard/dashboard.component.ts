import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  navbarOpen = false;
  toggleId: any;
  collapseMenuLink=false
  currentUser:any
  changePasswordRoute!: string;
  profileSettingRoute!: string;
  userName!: string
  constructor(
    private authService: AuthService
  ) { 
    this.currentUser = this.authService.currentUserValue;
    this.userName = this.currentUser.name
    this.setRoleBasedRoute(this.currentUser.role)
  }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  logout(){
    this.authService.logout();
  }

  collapsebleMenu(event:any): void {
    this.collapseMenuLink = !this.collapseMenuLink;
  }

  setRoleBasedRoute(role: any) {
    if(role ==='admin'){
      this.changePasswordRoute = '/admin/admin-change-password'
      this.profileSettingRoute = '/admin/admin-profile'
    }else if(role ==='user'){
      this.changePasswordRoute = '/user/user-change-password'
      this.profileSettingRoute = '/user/user-profile'
    }
  }

}
