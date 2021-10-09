import { Address } from './address.model';
import { EstablishmentCategory } from './establishment-category.model';
import { Location } from './location.model';
import { OfficeHour } from './office-hour.model';
import { Professional } from './professional.model';
import { Specialty } from './specialty.model';

export class Establishment {
  constructor(
    public id: number,
    public name: string,
    public category: EstablishmentCategory,
    public officeHours: OfficeHour[],
    public location: Location,
    public address: Address,
    public email: string,
    public phones: string[],
    public specialties: Specialty[],
    public professionals: Professional[]
  ) {}
}
