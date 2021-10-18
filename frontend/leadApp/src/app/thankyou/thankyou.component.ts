import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lead } from 'src/models/lead.model';
import { LeadService } from 'src/services/lead.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  
  lead!: Lead;

  constructor(
    private route: ActivatedRoute,
    private leadService: LeadService
    ) { 
    this.route.queryParams.subscribe(params => {
      this.lead.firstName = params['FirstName'];
      this.lead.emailAddress = params['EmailAddress'];
      this.lead.phone = params['Phone'];
      this.lead.intrestedProgram = params['mx_Interested_Programs'];
      this.lead.intrestedUniversity = params['mx_Interested_University'];
    });

    this.addLead(this.lead)

  }

  ngOnInit(): void {
  }

  addLead(lead: Lead) {
    this.leadService.addLead(lead).subscribe(res=>{
      console.log('Res', res)
    })
  }

}
