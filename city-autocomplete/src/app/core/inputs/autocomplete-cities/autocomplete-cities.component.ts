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
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'autocomplete-cities',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './autocomplete-cities.component.scss',
  templateUrl: './autocomplete-cities.component.html',
  providers: [AutocompleteCitiesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteCitiesComponent implements OnInit {
  autoCompleteCitiesService = inject(AutocompleteCitiesService);

  showSpinner = signal(false);

  input = signal('');
  cities = toObservable(this.input).pipe(
    filter((query) => query.length > 3),
    distinctUntilChanged(),
    debounceTime(500),
    tap(() => this.showSpinner.set(true)),
    switchMap((query) => this.autoCompleteCitiesService.getCities(query)),
    tap(() => this.showSpinner.set(false))
  );

  ngOnInit() {
    this.autoCompleteCitiesService.getCities().subscribe((cities) => {
      console.log(cities);
    });
  }

  handleInput(event: any): void {
    console.log(event.target.value);
    this.input.set(event.target.value);
  }
}
