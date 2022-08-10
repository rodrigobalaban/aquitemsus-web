import { Specialty } from './specialty.model';

export class Professional {
  constructor(
    public id: number,
    public name: string,
    public specialty: Specialty
  ) {}
}
