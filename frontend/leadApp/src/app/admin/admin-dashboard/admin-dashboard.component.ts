import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  underConstructionImg ='assets/images/under-construction.jpg'
  constructor() { }

  ngOnInit(): void {
  }

}
