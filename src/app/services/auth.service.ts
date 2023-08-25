import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;

  constructor() { }

  login( user: string, password: string ): boolean {
    if (user === 'pagos360' && password === '123abc') {
      this.isAuthenticated = true;
      return true
    } else {
      return false
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

}
