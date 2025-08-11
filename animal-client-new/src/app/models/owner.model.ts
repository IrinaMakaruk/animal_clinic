import { Pet } from './pet.model';
import { Address } from './address.model';

export interface Owner {
  id?: number;
  fullName: string;
  phoneNumber?: string;
  email?: string;
  address?: Address;
  pets?: Pet[];
}