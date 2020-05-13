import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from '../model/login.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
  }

  login(payload: Login): Observable<any> {
    // FIXME: Just api test
    const data =  { userName: payload.username
      , password: payload.password,
      userType: 'admin'};

      // return of({token: 'thtoken'}).pipe(delay(2000));
    return this.http.post<any>(`${environment.apiUrl}/authenticateUser`, data);
  }

}
