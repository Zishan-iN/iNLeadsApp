import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from 'src/app/models/lead.model';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  thankyouImg='assets/images/thankyou.jpg'
  studentname!:string;
  message!: string;
  showSuccess = false;
  showError = false;
  constructor(
    private route: ActivatedRoute,
    private leadService: LeadService,
    private router: Router
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
      if(firstName && emailAddress && phone && intrestedProgram && intrestedUniversity){
        this.addLead(lead)
      }else{
        window.location.href= 'https://inurture.co.in/'
      }
    });
  }

  ngOnInit(): void {
  }

  addLead(lead: Lead) {
    this.leadService.addLead(lead).subscribe(res=>{
      if(res.status = 'success'){
        this.showSuccess = true
        this.message = `Your form has been successfully submitted. We will get in touch with you shortly.`
      }
    },error=>{
      if(error.error.error = 'Lead already exist'){
        this.showError = true
        this.message = `You have already submitted same query. Please enquire for other program or university.`
        // setTimeout(() => {
        //   window.location.href= 'https://inurture.co.in/'
        // }, 5000);
      }else{
        this.showError =true
        this.message =`Some unknown error occured. Please try again later.`
        // setTimeout(() => {
        //   window.location.href= 'https://inurture.co.in/'
        // }, 5000);
      }
    })
  }

}
