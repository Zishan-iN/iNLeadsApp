import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    UserDashboardComponent,
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
    MatPaginatorModule,
    MatTableModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    UserDashboardComponent,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class SharedModule { }
