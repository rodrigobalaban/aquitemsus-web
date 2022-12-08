import { Address } from './address.model';
import { EstablishmentCategory } from './establishment-category.model';
import { Localization } from './localization.model';
import { OpeningHours } from './opening-hours.model';
import { Professional } from './professional.model';
import { Specialty } from './specialty.model';

export interface Establishment {
  id: number;
  name: string;
  category: EstablishmentCategory;
  openingHours: OpeningHours[];
  localization: Localization;
  address: Address;
  email: string;
  phone: string;
  specialties: Specialty[];
  professionals: Professional[];
  alwaysOpen: boolean;
  scheduling: boolean;
}
