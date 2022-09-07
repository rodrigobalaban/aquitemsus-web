import { Schedule } from './schedule';

export interface Rating {
  id: number;
  value: number;
  comment: string;
  schedule: Schedule;
}
