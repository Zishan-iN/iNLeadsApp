import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imgErrorMesg!: string;
  @ViewChild('imgInput') imgInputSelector!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event:any){
    const imgFile: File = <File>event.target.files[0];
    const allowedFileSize: number = 300 * 1024;
    const supportedFormat = ['image/jpg', 'image/png', 'image/jpeg'];
    console.log('Img', imgFile)
    if(imgFile.size>allowedFileSize){
      this.imgErrorMesg = 'Image should not greater than 300 KB.'
      this.imgInputSelector.nativeElement.value = '';
    }else if(!supportedFormat.includes(imgFile.type)){
      this.imgErrorMesg = 'Upload image in jgp, jpeg, png format only.'
      this.imgInputSelector.nativeElement.value = '';
    }
  }

}
