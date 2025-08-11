import { Animal } from './animal.model';
import { Owner} from './owner.model';
import { Species } from './species.model';

export interface Pet extends Animal {
  owner?: Owner;
  species?: Species;
  ownerId: number;
}