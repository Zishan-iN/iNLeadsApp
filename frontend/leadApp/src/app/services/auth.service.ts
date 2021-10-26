import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = environment.API_Url + '/user';
  user = new Subject<User>();

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<User>{
    return this.http.post<User>(this.baseApiUrl + '/login', user).pipe(
      catchError(this.handleError),
      map((user:any) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  forgotPassword(email:string): Observable<any>{
    return this.http.post<any>(this.baseApiUrl+'/forgot-password', {email: email}).pipe(
      catchError(this.handleError)
    )
  }

  loggedIn() {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
    this.router.navigate(['/']);
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log('errorRes', errorRes)
    let errorMessage = '';
    const err: any = errorRes.error.message;
    switch (err) {
      case `User doesn't exist`:
        errorMessage = `User doesn't exist.`;
        break;
      case 'Invalid Credentials.':
        errorMessage = 'Invalid Credentials.';
        break;
      case 'User not registred.':
        errorMessage = 'User not registred.';
        break;
      default:
        errorMessage = 'Unknown error occured, please try later!';
        break;
    }
    return throwError(errorMessage);
  }
}
