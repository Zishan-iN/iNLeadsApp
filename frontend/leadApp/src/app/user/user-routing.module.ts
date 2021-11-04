import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
   path: '',
   component: UserLandingComponent,
   children:[
      {path: '', redirectTo: '/leads/all-leads', pathMatch: 'full'},
      {path: 'user-profile', pathMatch: 'full', component: UserProfileComponent},
      {path: 'user-change-password',pathMatch: 'full', component: UserChangePasswordComponent},
   ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
