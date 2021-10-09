import { City } from "./city.model";

export class Address {
  constructor(
    public street: string,
    public number: string,
    public complement: string,
    public district: string,
    public city: City
  ) {}
}
