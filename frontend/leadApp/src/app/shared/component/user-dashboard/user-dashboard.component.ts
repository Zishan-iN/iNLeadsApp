import { Component, OnInit } from '@angular/core';
import { faBell, faCaretDown, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  navbarOpen = false;
  showSideMenu = false;
  toggleId = '';
  faExchangeAlt = faExchangeAlt;
  faBell = faBell;
  faCaretDown = faCaretDown;
  userProfile: any;
  thumbnail: any;
  userDefaultPhoto = '../../../../assets/image/no-user-img.png';
  imgUrl = environment.IMG_Url;
  subscription!: Subscription;
  currentUser: any;
  leaveAttendanceRoute!: string;
  dashboardRoute!: string;
  yourProfileRoute!: string;
  updateProfileRoute!: string;
  accountSettingRoute!: string;
  createTask!: string;
  previewTask!: string;
  completedTask!: string;
  appliedLeavesRoute!: string;
  constructor() { }

  ngOnInit(): void {
  }

  showImage(profileImage: File): void {
    // const photo = this.sanitizer.bypassSecurityTrustUrl(
    //   this.imgUrl + profileImage
    // );
    // this.thumbnail = photo;
  }

  toggleNavbar(event:any): void {
    this.toggleId = event;
    this.navbarOpen = !this.navbarOpen;
  }

  toggleSidebar(): void {
    this.showSideMenu = !this.showSideMenu;
  }

  logout(): void {
    // this.authService.logout();
  }

}
