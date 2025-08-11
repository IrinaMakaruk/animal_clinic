import { Animal } from './animal.model';
import { Species } from './species.model';

export interface WildAnimal extends Animal {
  species?: Species;
  trackingId?: number;
}