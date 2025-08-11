import {Entity, model, property, belongsTo} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_species_petId: {
        name: 'fk_species_petId',
        entity: 'Pet',
        entityKey: 'id',
        foreignKey: 'petid',
      },
    },
    fk_species_wildAnimalId: {
      name: 'fk_species_wildAnimalId',
      entity: 'WildAnimal',
      entityKey: 'id',
      foreignKey: 'wildAnimalid',
    },
  },
})

export class Species extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  label?: string;

  @property({
    type: 'number',
  })
  petId?: number;

  @property({
    type: 'number',
  })
  wildAnimalId?: number;

  constructor(data?: Partial<Species>) {
    super(data);
  }
}

export interface SpeciesRelations {}

export type SpeciesWithRelations = Species & SpeciesRelations;
