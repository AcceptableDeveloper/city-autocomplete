import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from './city';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteCitiesService {
  http = inject(HttpClient);
  storedCities: City[] = [];

  public getCities(query: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000?city=${query}`);
  }
}
