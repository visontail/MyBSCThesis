import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapComponent } from '../map/map.component';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  stationPos : MapComponent[] = [];

  getPositions(): Observable<any> {
    const url = `${this.apiUrl}/pos`;
    const result = this.http.get<any>(url);
    return result
  }

  getPos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/pos');
  }
}
