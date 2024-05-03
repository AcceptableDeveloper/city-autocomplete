import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './core/inputs/autocomplete-cities/autocomplete-cities.component'
      ).then((m) => m.AutocompleteCitiesComponent),
  },
];
