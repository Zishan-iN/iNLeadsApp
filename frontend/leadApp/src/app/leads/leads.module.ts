import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsLandingComponent } from './leads-landing/leads-landing.component';
import { LeadsListComponent } from './leads-list/leads-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LeadsLandingComponent,
    LeadsListComponent
  ],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    SharedModule,
  ],
  exports:[
    LeadsLandingComponent,
    LeadsListComponent
  ]
})
export class LeadsModule { }
