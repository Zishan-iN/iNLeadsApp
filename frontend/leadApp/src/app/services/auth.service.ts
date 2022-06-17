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
  private clearTimer:any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')|| '{}')
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
        if (user && user.token) {
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

  resetPassword(password: any, token: any): Observable<any> {
    return this.http
      .post<any>(this.baseApiUrl + '/reset-password/' + token, {
        password: password,
      })
      .pipe(catchError(this.handleError));
  }

  changePassword(data: any): Observable<any> {
    return this.http.patch<any>(this.baseApiUrl + '/change-password', {
      password: data.password,
      oldpassword: data.oldpassword,
    });
  }

  getLoggedInUserProfile() {
    return this.http.get<User>(this.baseApiUrl + '/user-profile');
  }

  changeUserProfilePhoto(formdata:FormData):Observable<any>{
    return this.http.patch<any>(`${this.baseApiUrl}/change-profile-photo`, formdata)
  }

  deleteUserPhoto():Observable<any>{
    return this.http.delete<any>(`${this.baseApiUrl}/delete-photo`)
  }

  loggedIn() {
    const currentUser:any = this.currentUserValue;
    if (currentUser && currentUser.token) {
      this.autoLogout(currentUser?.expireTime)
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null!);
    if(this.clearTimer){
      clearTimeout(this.clearTimer)
    }
  }

  autoLogout(expireTime:number){
    const expireSession = expireTime*1000
    this.clearTimer = setTimeout(() => {
      this.logout()
    }, expireSession);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '';
    // const err: any = errorRes.error.message;
    
    switch (true) {
      case errorRes.error.message===`User doesn't exist`:
        errorMessage = `User doesn't exist.`;
        break;
      case errorRes.error.message==='Invalid Credentials.':
        errorMessage = 'Invalid Credentials.';
        break;
      case errorRes.error.message==='User not registred.':
        errorMessage = 'User not registred.';
        break; 
      case errorRes.status === 429:
        errorMessage = errorRes.error;
        break; 
      default:
        errorMessage = 'Unknown error occured, please try later!';
        break;
    }
    return throwError(errorMessage);
  }
}
