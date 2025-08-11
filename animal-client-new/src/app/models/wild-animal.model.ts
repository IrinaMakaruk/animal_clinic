import { Species } from './species.model';

export interface WildAnimal {
  id?: number;
  name: string;
  age?: number;
  habitat?: string;
  isEndangered?: boolean;
  dateFound?: Date | string;
  speciesId?: number;
  species?: Species;
}