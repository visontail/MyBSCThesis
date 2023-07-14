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
    const url = `${this.apiUrl}/stations`; // Replace with your Node.js API endpoint
    return this.http.get<any>(url);
  }
}
