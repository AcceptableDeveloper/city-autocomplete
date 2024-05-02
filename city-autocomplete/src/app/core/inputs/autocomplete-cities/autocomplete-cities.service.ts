import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteCitiesService {
  http = inject(HttpClient);

  public getAllCities(): Observable<any> {
    console.log('Getting all cities');
    return this.http.get<any>(`http://localhost:8000/all-cities`);
  }
}
