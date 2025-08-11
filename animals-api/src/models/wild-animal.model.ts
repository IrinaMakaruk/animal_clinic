import {model, property, hasOne} from '@loopback/repository';
import {Animal} from '.';
import {Species} from './species.model';

@model()
export class WildAnimal extends Animal {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  trackingId?: number;

  @hasOne(() => Species)
  species: Species;

  constructor(data?: Partial<WildAnimal>) {
    super(data);
  }
}

export interface WildAnimalRelations {}

export type WildAnimalWithRelations = WildAnimal & WildAnimalRelations;
