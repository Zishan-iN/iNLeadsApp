import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLandingComponent,
    children:[
      {path: '', redirectTo: 'admin-dashboard'},
      {path: 'admin-dashboard', component: AdminDashboardComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
