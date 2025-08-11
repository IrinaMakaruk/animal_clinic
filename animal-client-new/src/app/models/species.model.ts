import { Pet } from './pet.model';
import { WildAnimal } from './wild-animal.model';

export interface Species {
  id?: number;
  name: string;
  description?: string;
  isDomestic?: boolean;
  pets?: Pet[];
  wildAnimals?: WildAnimal[];
}