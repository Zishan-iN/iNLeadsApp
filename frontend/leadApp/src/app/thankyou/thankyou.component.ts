import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  
  firstName:string='';
  email:string=''
  phone:string=''
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.firstName = params['FirstName'];
      this.email = params['EmailAddress'];
      this.phone = params['Phone'];
    });
  }

  ngOnInit(): void {
  }

}
