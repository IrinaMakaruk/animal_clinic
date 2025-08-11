import {DefaultCrudRepository} from '@loopback/repository';
import {Address, AddressRelations, Owner} from '../models';
import {AnimalsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  AddressRelations
> {

  constructor(
    @inject('datasources.animals') dataSource: AnimalsDataSource,
  ) {
    super(Address, dataSource);
  }
}
