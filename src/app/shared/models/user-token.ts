import { User } from './user.model';

export interface UserToken extends User {
  token: string;
  expirationTime: Date;
}
