import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { MatFormFieldModule } from '@angular/material/form-field/';
import { HasRoleDirective } from './directive/has-role.directive';
import { ProfileComponent } from './account-settings/profile/profile.component';
import { ChangePasswordComponent } from './account-settings/change-password/change-password.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DashboardComponent,
    AlertMessageComponent,
    HasRoleDirective,
    ProfileComponent,
    ChangePasswordComponent,
    PasswordStrengthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatMenuModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    DashboardComponent,
    ProfileComponent,
    ChangePasswordComponent,
    AlertMessageComponent,
    PasswordStrengthComponent,
    HasRoleDirective
  ]
})
export class SharedModule { }
