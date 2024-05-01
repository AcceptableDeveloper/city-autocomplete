export class City {
  public readonly name?: string;
  public readonly country?: string;

  constructor(data: Record<string, any>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
