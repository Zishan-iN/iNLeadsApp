import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  inLogo = 'assets/images/iNBrandLogo.png'
  avtarImg = 'assets/images/avatar.jpg'
  navbarOpen = false;
  toggleId: any;
  collapseMenuLink=false
  currentUser:any
  changePasswordRoute!: string;
  profileSettingRoute!: string;
  userName!: string;
  thumbnail: any;
  imgUrl = environment.IMG_Url;
  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { 
    this.currentUser = this.authService.currentUserValue;
    this.userName = this.currentUser.name
    this.setRoleBasedRoute(this.currentUser.role)
  }

  ngOnInit(): void {
    this.getUserProfile()
  }

  getUserProfile() {
     this.authService.getLoggedInUserProfile().subscribe(res=>{
      this.currentUser = res
      this.showImage(this.currentUser.profileImage)
    })
  }

  showImage(profileImage: any) {
    const photo = this.sanitizer.bypassSecurityTrustUrl(this.imgUrl + profileImage);
    this.thumbnail = photo;
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
