import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLandingComponent,
    children:[
      {path: '', redirectTo: 'admin-dashboard'},
      {path: 'admin-dashboard', component: AdminDashboardComponent},
      {path:'admin-profile', component:AdminProfileComponent},
      {path:'admin-change-password', component:AdminChangePasswordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
