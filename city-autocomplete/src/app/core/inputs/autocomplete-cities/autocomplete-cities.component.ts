import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { AutocompleteCitiesService } from './autocomplete-cities.service';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { City } from './city';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';

@Component({
  selector: 'autocomplete-cities',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  styleUrl: './autocomplete-cities.component.scss',
  providers: [AutocompleteCitiesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label for="cities">City:</label>
    @if (!showSpinner()) {
    <input
      class="input"
      type="text"
      id="cities"
      (input)="handleInput($event)"
    />
    <ul
      class="dropdown-content is-paddingless is-marginless type-ahead"
      role="menu"
    >
      @for (city of cityList; track $index) {
      <li class="dropdown-item is-clickable">{{ city.name }}</li>
      }
    </ul>
    } @else {
    <loading-spinner></loading-spinner>
    }
  `,
})
export class AutocompleteCitiesComponent implements OnInit {
  autoCompleteCitiesService = inject(AutocompleteCitiesService);

  showSpinner = signal(false);

  allCities: City[] = [];
  cityList: City[] = [];

  input = signal('');
  cities = toObservable(this.input).pipe(
    filter((query) => query.length > 0),
    distinctUntilChanged(),
    debounceTime(500),
    tap(() => this.showSpinner.set(true)),
    switchMap((query) => this.fetchCities(query)),
    tap(() => this.showSpinner.set(false))
  );

  ngOnInit(): void {
    this.cities.subscribe((data) => {
      this.cityList = data.map((city: any) => new City(city));
    });
  }

  loadAllCities() {
    if (!this.allCities.length) {
      // Check if cache is empty
      this.autoCompleteCitiesService.getCities('').subscribe((cities) => {
        this.allCities = cities; // Cache all cities
      });
    }
  }

  fetchCities(query: string) {
    // Filter the cached cities
    const filteredCities = this.allCities.filter((city) =>
      city?.name?.toLowerCase().includes(query.toLowerCase())
    );

    // If there are matches in the cache, return them as an observable
    if (filteredCities.length) {
      return of(filteredCities);
    } else {
      // If there are no matches in the cache, fall back to a network request
      return this.autoCompleteCitiesService.getCities(query).pipe(
        tap((cities) => (this.allCities = [...this.allCities, ...cities])), // Update cache with new cities
        catchError((error) => {
          console.error('Error fetching cities:', error);
          this.showSpinner.set(false);
          return of([]); // Return an empty array in case of an error
        })
      );
    }
  }

  handleInput(event: any): void {
    this.input.set(event.target.value);
  }
}
