import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { SharedModule } from '../shared/shared.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LeadsListComponent } from '../leads/leads-list/leads-list.component';
import { LeadsModule } from '../leads/leads.module';


@NgModule({
  declarations: [
    UserLandingComponent,
    UserDashboardComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
