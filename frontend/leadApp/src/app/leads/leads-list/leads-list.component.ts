import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowLeft, faDownload, faFilter, faPaperPlane, faPen, faPlus, faSearch, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Lead } from 'src/app/models/lead.model';
import { LeadService } from 'src/app/services/lead.service';
import * as XLSX from 'xlsx';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertMessageService } from 'src/app/services/alert-message.service';

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
  faUndo = faUndo;
  faFilter = faFilter
  fileName = 'Leads.xlsx';
  displayedColumns: string[] = ['select','createdAt','firstName', 'emailAddress', 'phone', 'intrestedProgram', 'intrestedUniversity','userConsent'];
  displayedColum: string[] = ['createdAt','firstName', 'emailAddress', 'phone', 'intrestedProgram', 'intrestedUniversity', 'userConsent'];
  dataSource:any;
  selection:any;
  data:any;
  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  search!: string;
  responsive=true;
  options = { autoClose: true, redirect: false, redirectLink: '' };
  showWarning:boolean = false;
  warningMesg!: string;
  selectionLength: any;
  constructor(
    private leadService: LeadService,
    private _liveAnnouncer: LiveAnnouncer,
    private alertService: AlertMessageService,
  ) { }
  
  ngOnInit(): void {
    this.getAllLeads();
  }

  getAllLeads() {
    this.leadService.getAllLeads().subscribe(res=>{
      if(res.status === "success"){
        this.dataSource = new MatTableDataSource<Lead>(res.leads)
        this.selection = new SelectionModel<Lead>(true, []);
        this.data = Object.assign(res.leads);
        this.setDataSourceAttributes()
      }
    }, err=>{
      if(err.status === 429){
        this.alertService.error(err.error, this.options)
      }else if(err.status === 500){
        this.alertService.error("Internal Server Error! Try Later.", this.options)
      }else{
        this.alertService.error("Unknown error, please try later.", this.options)
      }
    })
  }

  setDataSourceAttributes() {
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  removeSelectedRows(){
    this.showWarning =true
    this.selectionLength = this.selection.selected.length
    if(this.selection.selected.length>0){
      if(this.selection.selected.length===1){
        this.warningMesg = 'Are you sure you want to delete this lead? This action cannot be undone.'
      }else if(this.selection.selected.length > 1 && this.selection.selected.length < this.dataSource?.data?.length){
        this.warningMesg = `Are you sure you want to delete these ${this.selection.selected.length} leads? This action cannot be undone.`
      }else{
        this.warningMesg = `Are you sure you want to delete all ${this.dataSource?.data?.length} leads? This action cannot be undone.`
      }
    }else{
      this.warningMesg = 'Please select lead to delete.'
      setTimeout(() => {
        this.showWarning = false
      }, 3000);
    }
  }

  confirmLeadDeletion(){
    let idArray:any[]=[]
    this.selection.selected.forEach((item:any) => {
      idArray.push(item.id)
    });
    this.leadService.deleteSelectedLeads(idArray).subscribe(res =>{
      if(res.status ='success'){
        this.showWarning = false
        this.alertService.success('Selected lead are deleted successfully', this.options)
      }
      this.getAllLeads()
    },error=>{
      this.alertService.error('Unknown error occured.Please try again later.', this.options)
    })
    
  }

  cancelDeletion(){
    this.showWarning = false;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(
        (row: any) => this.selection.select(row));
  }


  applyFilter(){
    this.dataSource.filter = this.search ? this.search.trim().toLowerCase() : '';
  }

  filterList(data:string){
    this.leadService.getAllLeadsAgreeToCall(data).subscribe(res=>{
      this.dataSource = new MatTableDataSource<Lead>(res)
      this.selection = new SelectionModel<Lead>(true, []);
      this.data =Object.assign(res);
      this.setDataSourceAttributes()
    })
    
  }

  exportexcel(fileFormat: string) {
    let element = document.getElementById('data-table');
    
    if(fileFormat=='xlsx'){
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      ws['!cols'] = [];
      ws['!cols'][0] = {hidden: true}
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, this.fileName);
    }else{
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws);
      XLSX.writeFile(wb, 'Leads.csv', {bookType:"csv"});
    }
    
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  refreshLeads(){
    this.getAllLeads()
  }

}
