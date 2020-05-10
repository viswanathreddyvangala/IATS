import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
  }

  login(payload) {
    return of({token: 'thtoken'}).pipe(delay(2000));
  }

}
