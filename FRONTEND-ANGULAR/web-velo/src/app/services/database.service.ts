import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getTestDone(): Observable<any> {
    const url = `${this.apiUrl}/station/120001`;
    return this.http.get<any>(url);
  }
}
