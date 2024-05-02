import { ICity } from '@core/inputs/autocomplete-cities/city.interface';

export class City implements ICity {
  public readonly name!: string;

  constructor(data: Record<string, any>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
