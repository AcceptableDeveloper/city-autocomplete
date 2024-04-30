import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteCitiesService {
  http = inject(HttpClient);

  getCities(query?: string): Observable<string[]> {
    console.log(query);
    return this.http.get<string[]>(`http://localhost:8000?city=${query}`);
  }
}
