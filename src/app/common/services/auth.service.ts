import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUserKey = 'LoggedInUser';
  constructor(private router: Router) { }

  setToken(token: string) {
    localStorage.setItem(this.loggedUserKey, token);
  }
  getToken() {
    return localStorage.getItem(this.loggedUserKey);
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem(this.loggedUserKey);
    this.router.navigate(['Login']);
  }
}
