import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsLandingComponent } from './leads-landing/leads-landing.component';
import { LeadsListComponent } from './leads-list/leads-list.component';

const routes: Routes = [
  {
  path: '',
  component: LeadsLandingComponent,
  children:[
    {path: '', redirectTo: 'all-leads'},
    {path: 'all-leads', component: LeadsListComponent}
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
