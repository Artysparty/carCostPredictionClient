import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarParams } from '../types/carParams.type';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = 'http://localhost:8000/predict';

  constructor(private http: HttpClient) { }




  // Метод для отправки POST-запроса на сервер
  predict(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    return this.http.post<any>(this.apiUrl, JSON.stringify(data), { headers });
  }
}
