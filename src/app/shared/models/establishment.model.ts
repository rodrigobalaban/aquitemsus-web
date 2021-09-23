import { Location } from './location.model';
import { EstablishmentCategory } from './establishment-category.model';
import { OfficeHour } from './office-hour.model';

export class Establishment {
  constructor(
    public id: number,
    public name: string,
    public category: EstablishmentCategory,
    public officeHours: OfficeHour[],
    public location: Location
  ) {}
}
