import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Car {
  id?: string;
  model: string;
  kmh: number;
  characteristic?: { [key: string]: string | number };
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://127.0.0.1:8081/api/cars'; 
  private headers = new HttpHeaders({
    'Content-Type': 'application/ld+json'
  });
  constructor(private http: HttpClient) {}

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  addCar(car: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, car, { headers: this.headers });
  }

  editCar(id: number, car: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, car, { headers: this.headers });
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  calculateTime(distance: number, model: string): Observable<{ estimated_time_hours: number }> {
    return this.http.post<{ estimated_time_hours: number }>(`${this.apiUrl}/calculate-time`, {
      distance,
      model
    });
  }
}
