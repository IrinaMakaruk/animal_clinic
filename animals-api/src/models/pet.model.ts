import {model, property, belongsTo, hasOne} from '@loopback/repository';
import {Animal} from '.';
import {Owner} from './owner.model';
import {Species} from './species.model';

@model({
  settings: {
    foreignKeys: {
      fk_pet_ownerId: {
        name: 'fk_pet_ownerId',
        entity: 'Owner',
        entityKey: 'id',
        foreignKey: 'ownerid',
      },
    },
  },
})
export class Pet extends Animal {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Owner)
  ownerId: number;

  @hasOne(() => Species)
  species: Species;

  constructor(data?: Partial<Pet>) {
    super(data);
  }
}

export interface PetRelations {
  // describe navigational properties here
}

export type PetWithRelations = Pet & PetRelations;
