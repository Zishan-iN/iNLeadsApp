import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { SharedModule } from '../shared/shared.module';
import { LeadsListComponent } from '../leads/leads-list/leads-list.component';
import { LeadsModule } from '../leads/leads.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    UserLandingComponent,
    UserDashboardComponent,
    UserChangePasswordComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
