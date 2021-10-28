import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lead } from 'src/app/models/lead.model';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  studentname!:string;
  constructor(
    private route: ActivatedRoute,
    private leadService: LeadService
    ) { 
    this.route.queryParams.subscribe(params => {
      let firstName = params['FirstName'];
      let emailAddress = params['EmailAddress'];
      let phone = params['Phone'];
      let intrestedProgram = params['mx_Interested_Programs'];
      let intrestedUniversity = params['mx_Interested_University'];

      this.studentname =firstName
      let lead =new Lead()
      lead.firstName = firstName
      lead.emailAddress = emailAddress
      lead.phone = phone
      lead.intrestedProgram =intrestedProgram
      lead.intrestedUniversity =intrestedUniversity
      this.addLead(lead)
    });
  }

  ngOnInit(): void {
  }

  addLead(lead: Lead) {
    this.leadService.addLead(lead).subscribe(res=>{
      console.log('Res', res)
      // if(res.success){

      // }
    })
  }

}
