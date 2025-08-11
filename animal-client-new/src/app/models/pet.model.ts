import { Species } from './species.model';
import { Owner } from './owner.model';

export interface Pet {
  id?: number;
  name: string;
  age?: number;
  color?: string;
  weight?: number;
  dateOfBirth?: Date | string;
  ownerId: number;
  speciesId?: number;
  owner?: Owner;
  species?: Species;
}