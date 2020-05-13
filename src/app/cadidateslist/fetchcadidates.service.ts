import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {CandidatesList} from '.././model/cadidate-list.model';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchcadidatesService {

  constructor(private http: HttpClient) {}
  serverURL = 'http://localhost:3000';

  getCadidatesList() {
    return this.http.get<Array<CandidatesList>>(this.serverURL + '/candidatesList')
      .pipe(
        delay(500)
      );
  }

  postCadidatesList(data: CandidatesList) {
    // FIXME: Just for api test
    return this.http.post<Array<CandidatesList>>(`${environment.apiUrl}/createUser`, data);
  }

  sendMails(data:CandidatesList){
    return of(this.http.post('http://localhost:5000/sendemail', data)
      .subscribe(data => {
        return data;
      })
    );
  }

  updateCadidatesList(data:CandidatesList){
    return of(this.http.put<Array<CandidatesList>>(this.serverURL + '/candidatesList/' + data.id, data)
      .subscribe(data => {
        return data;
      }));
  }
  deleteCandidateList(id:string){
    return of(this.http.delete(this.serverURL + '/candidatesList/' + id)
      .subscribe(data => {
        return data;
      }));
  }
}
