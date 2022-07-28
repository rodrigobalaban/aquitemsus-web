import { Address } from './address.model';
import { EstablishmentCategory } from './establishment-category.model';
import { Localization } from './localization.model';
import { OpeningHours } from './opening-hours.model';
import { Professional } from './professional.model';
import { Specialty } from './specialty.model';

export class Establishment {
  constructor(
    public id: number,
    public name: string,
    public category: EstablishmentCategory,
    public openingHours: OpeningHours[],
    public localization: Localization,
    public address: Address,
    public email: string,
    public phone: string,
    public specialties: Specialty[],
    public professionals: Professional[],
    public alwaysOpen: boolean
  ) {}
}
