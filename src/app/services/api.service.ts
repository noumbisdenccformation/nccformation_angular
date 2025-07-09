import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Auth endpoints
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  // Formation endpoints
  getActiveFormations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/formations/active`);
  }

  getFormationById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/formations/${id}`);
  }

  searchFormations(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/formations/search?keyword=${keyword}`);
  }
}