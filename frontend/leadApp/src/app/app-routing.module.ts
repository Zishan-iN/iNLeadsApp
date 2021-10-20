import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { UserLandingComponent } from './user/user-landing/user-landing.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'leads',
    loadChildren: () => import('./leads/leads.module').then(m => m.LeadsModule),
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
