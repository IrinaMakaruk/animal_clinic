import {Entity, model, property, hasOne} from '@loopback/repository';

@model()
export class Animal extends Entity {
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  birthday?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  vaccinated: boolean;

  @property({
    type: 'string',
    default: 'male',
  })
  sex: string;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'string',
  })
  size?: string;

  @property({
    type: 'string',
  })
  briefInfo?: string;

  constructor(data?: Partial<Animal>) {
    super(data);
  }
}

export interface AnimalRelations {}

export type AnimalWithRelations = Animal & AnimalRelations;
