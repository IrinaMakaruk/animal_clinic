import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Owner} from './owner.model';

@model({
  settings: {
    foreignKeys: {
      fk_address_ownerId: {
        name: 'address_ownerid_fkey',
        entity: 'Owner',
        entityKey: 'id',
        foreignKey: 'ownerid',
        onDelete: 'CASCADE'
      },
    },
  },
})

export class Address extends Entity {
  @property({
    type: 'string',
  })
  street?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  zipCode?: string;

  @belongsTo(() => Owner)
  ownerId: number;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {}

export type AddressWithRelations = Address & AddressRelations;
