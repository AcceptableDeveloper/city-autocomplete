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

  cities: City[] = [];

  input = signal('');
  showSpinner = signal(false);

  ngOnInit(): void {
    this.loadAllCities();
  }

  loadAllCities() {
    this.showSpinner.set(true);
    this.autoCompleteCitiesService.getAllCities().subscribe((cities) => {
      this.cities = cities.map((city: any) => new City(city));
      this.showSpinner.set(false);
    });
  }

  handleInput(event: any): void {
    this.input.set(event.target.value);
  }
}
