import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { faArrowLeft, faDownload, faPaperPlane, faPen, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Lead } from 'src/app/models/lead.model';
import { LeadService } from 'src/app/services/lead.service';
import * as XLSX from 'xlsx';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';

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
  // leadList:Lead[]=[];
  fileName = 'Leads.xlsx';
  displayedColumns: string[] = ['select','name', 'email', 'phone', 'course', 'university'];
  //dataSource = new MatTableDataSource<Lead>();
  dataSource:any;
  selection:any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  lead:any=[];
  constructor(
    private leadService: LeadService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }
  
  ngOnInit(): void {
    this.getAllLeads()
  }

  getAllLeads() {
    this.leadService.getAllLeads().subscribe(res=>{
      console.log('Res', res)
      this.dataSource = new MatTableDataSource<Lead>(res)
      this.selection = new SelectionModel<Lead>(true, []);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  removeSelectedRows(){
    // this.selection.selected.forEach(item => {
    //   let index: number = this.data.findIndex(d => d === item);
    //   console.log(this.data.findIndex(d => d === item));
    //   this.data.splice(index,1)
    //   this.dataSource = new MatTableDataSource<Element>(this.data);
    // });
    // this.selection = new SelectionModel<Element>(true, []);
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
          (row:any) => this.selection.select(row));
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

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
