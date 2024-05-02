import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICity } from '@core/inputs/autocomplete-cities/city.interface';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteCitiesService {
  http = inject(HttpClient);

  public getAllCities(): Observable<ICity[]> {
    return this.http.get<ICity[]>(`http://localhost:8000/all-cities`);
  }
}
