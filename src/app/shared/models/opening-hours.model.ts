export class OpeningHours {
  constructor(
    public id: number,
    public dayOfWeek: string,
    public openingTime: string,
    public closingTime: string
  ) {}
}
