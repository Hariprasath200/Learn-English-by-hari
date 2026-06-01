import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // 👈 reads from environment file
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  
  checkHealth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/home/`);
  }
}