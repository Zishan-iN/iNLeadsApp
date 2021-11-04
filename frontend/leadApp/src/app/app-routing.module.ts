import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'thankyou', component: ThankyouComponent},
  
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'leads',
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'user'] },
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
