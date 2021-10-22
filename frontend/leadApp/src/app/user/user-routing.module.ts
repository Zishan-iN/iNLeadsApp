import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLandingComponent } from './user-landing/user-landing.component';

const routes: Routes = [
  {
    path:'', 
    redirectTo: 'dashbaord',
    pathMatch: 'full',
  },
  { 
    path:'dashbaord',
    component: UserLandingComponent,
    children:[
      {path: 'dashboard', component: UserDashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
