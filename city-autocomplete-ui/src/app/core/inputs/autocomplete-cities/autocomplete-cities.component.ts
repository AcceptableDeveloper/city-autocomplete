import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { AutocompleteCitiesService } from '@core/inputs/autocomplete-cities/autocomplete-cities.service';
import { City } from './city';
import { LoadingSpinnerComponent } from '@core/loading-spinner/loading-spinner.component';
import { ICity } from './city.interface';

@Component({
  selector: 'autocomplete-cities',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  styleUrl: './autocomplete-cities.component.scss',
  providers: [AutocompleteCitiesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      @if (!showSpinner()) {
      <input
        type="text"
        list="cities"
        placeholder="Search for a city..."
        (input)="handleInput($event)"
      />
      <datalist id="cities">
        @for (city of cities; track $index) {
        <option>{{ city.name }}</option>
        }
      </datalist>
      } @else {
      <loading-spinner></loading-spinner>
      }
    </section>
  `,
})
export class AutocompleteCitiesComponent implements OnInit {
  autoCompleteCitiesService = inject(AutocompleteCitiesService);

  cities: ICity[] = [];

  input = signal('');
  showSpinner = signal(false);

  ngOnInit(): void {
    this.loadAllCities();
  }

  loadAllCities() {
    this.showSpinner.set(true);
    this.autoCompleteCitiesService.getAllCities().subscribe({
      next: (res: ICity[]) => {
        this.cities = res.map((city: ICity) => new City(city));
      },
      error: (err: any) => console.log('Failed to retrieve cities', err),
      complete: () => this.showSpinner.set(false),
    });
  }

  handleInput(event: any): void {
    this.input.set(event.target.value);
  }
}
