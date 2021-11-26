import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user.model';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imgErrorMesg!: string;
  avtarImg = 'assets/images/avatar.jpg'
  imgUrl = environment.IMG_Url;
  @ViewChild('imgInput') imgInputSelector!: ElementRef;
  thumbnail: any;
  currentUser!: User;
  options = { autoClose: true, redirect: false, redirectLink: '' };
  constructor(
    private authService:AuthService,
    private alertService: AlertMessageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getUserProfile()
  }

  onFileSelected(event:any){
    const imgFile: File = <File>event.target.files[0];
    const allowedFileSize: number = 300 * 1024;
    const supportedFormat = ['image/jpg', 'image/png', 'image/jpeg'];
    if(imgFile.size>allowedFileSize){
      this.imgErrorMesg = 'Image should not greater than 300 KB.'
      this.imgInputSelector.nativeElement.value = '';
      this.alertService.error(this.imgErrorMesg, this.options);
    }else if(!supportedFormat.includes(imgFile.type)){
      this.imgErrorMesg = 'Upload image in jpg, jpeg, png format only.'
      this.imgInputSelector.nativeElement.value = '';
      this.alertService.error(this.imgErrorMesg, this.options);
    }else{
      let formData = new FormData()
      formData.append('profileImg', imgFile,imgFile.name)
      this.authService.changeUserProfilePhoto(formData).subscribe(res=>{
        if(res.status=='success'){
          this.alertService.success(res.message, this.options);
          this.getUserProfile()
        }
      })
    }
  }

  getUserProfile(){
    this.authService.getLoggedInUserProfile().subscribe(res=>{
      this.currentUser = res
      this.showImage(this.currentUser.profileImage)
    })
  }

  showImage(data: any) {
    const photo = this.sanitizer.bypassSecurityTrustUrl(this.imgUrl + data);
    this.thumbnail = photo;
  }

  deletePhoto(){
    // this.authService.deleteUserPhoto().subscribe(res=>{
    //   console.log('Del', res)
    // })
  }

}
