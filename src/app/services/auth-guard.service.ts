import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private root: Router) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticatedUser()) {
      return true;
    } else {
      this.root.navigate(['/login']);
      return false;
    }
  }
}
