import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faDownload, faPaperPlane, faPen, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Lead } from 'src/models/lead.model';
import { LeadService } from 'src/services/lead.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.css']
})
export class LeadsListComponent implements OnInit {
  faSearch = faSearch;
  faPlus = faPlus;
  faDownload = faDownload;
  faPen = faPen;
  faTrash = faTrash;
  faPaperPlane=faPaperPlane;
  faArrowLeft=faArrowLeft;
  currentPage = 1;
  pageSize = 10;
  total!: number;
  leadList:Lead[]=[];
  fileName = 'Leads.xlsx';
  testData: Lead[]=[
    {
      _id: "1", 
      firstName: "Rahul Kumar", 
      emailAddress: "rahul@test.com", 
      phone: "9999999999", 
      intrestedProgram: "BCA General",
      intrestedUniversity: "GGI Institute"
    },
    {
      _id: "2", 
      firstName: "Rishi", 
      emailAddress: "rishi@test.com", 
      phone: "9999999999", 
      intrestedProgram: "BCA General",
      intrestedUniversity: "GGI Institute"
    },
    {
      _id: "3", 
      firstName: "Pawan Kumar", 
      emailAddress: "pawan@test.com", 
      phone: "9999999999", 
      intrestedProgram: "BCA General",
      intrestedUniversity: "GGI Institute"
    },
  ]
  constructor(private leadService: LeadService) { }

  ngOnInit(): void {
    this.getAllLeads()
  }

  getAllLeads() {
    this.leadList= this.testData
    this.leadService.getAllLeads().subscribe(res=>{
      console.log('Res', res)
      // this.leadList= res
      // console.log('Res', this.leadList)
    })
  }

  pageChanged(event:any): void {
    this.currentPage = event;
  }

  changeItemPerPage(event:any): void {
    this.pageSize = event;
  }

  onFilterChange(event:any){
    console.log('Do something')
  }

  deleteLead(id: any){
    console.log('id', id)
    this.leadService.deleteLead(id).subscribe(res=>{
      console.log('res', res)
    })
  }

  exportexcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

}
