import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user: any){
    
  }

  isLoggedIn(): boolean {
    return false;
  }
}
