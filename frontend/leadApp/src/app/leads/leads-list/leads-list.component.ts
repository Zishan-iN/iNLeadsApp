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
  fileName = 'Leads.xlsx';
  displayedColumns: string[] = ['select','createdAt','firstName', 'emailAddress', 'phone', 'intrestedProgram', 'intrestedUniversity'];
  dataSource:any;
  selection:any;
  data:any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  lead:any=[];
  search!: string;
  responsive=true
  constructor(
    private leadService: LeadService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }
  
  ngOnInit(): void {
    this.getAllLeads()
  }

  getAllLeads() {
    this.leadService.getAllLeads().subscribe(res=>{
      this.dataSource = new MatTableDataSource<Lead>(res)
      this.selection = new SelectionModel<Lead>(true, []);
      this.data =Object.assign(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  removeSelectedRows(){
    let idArray:any[]=[]
    this.selection.selected.forEach((item:any) => {
      idArray.push(item.id)
      this.leadService.deleteSelectedLeads(idArray).subscribe(res=>{
        this.getAllLeads()
      })
    });
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


  applyFilter(){
    console.log(this.search)
    this.dataSource.filter = this.search ? this.search.trim().toLowerCase() : '';
  }

  exportexcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  announceSortChange(sortState: Sort) {
    console.log('sortState', sortState)
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
