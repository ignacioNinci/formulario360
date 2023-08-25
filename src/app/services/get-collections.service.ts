import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExecuteQueryActionsScreen } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCollectionsService {

  apiUrl: string = environment.apiUrl;
  apiKey: string = environment.apiKey;

  constructor( private http: HttpClient ) { }

  getCollections(): Observable<ExecuteQueryActionsScreen> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.get<ExecuteQueryActionsScreen>(`${this.apiUrl}/17-10-2022`, { headers })
  }
}
