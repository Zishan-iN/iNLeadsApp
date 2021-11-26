import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Lead } from 'src/app/models/lead.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  baseApiUrl = environment.API_Url+'/leads'

  constructor(private http: HttpClient) { }

  addLead(lead: Lead): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/create', lead);
  }

  getAllLeads(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUrl + '/all-leads');
  }

  getLeadById(id: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + `/${id}`);
  }

  deleteLead(id: string): Observable<any> {
    return this.http.delete<any>(this.baseApiUrl + `/${id}`);
  }

  deleteSelectedLeads(idArray: any[]): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/delete-selected', idArray);
  }

}
