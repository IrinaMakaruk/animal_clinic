import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Species, SpeciesRelations, Animal} from '../models';
import {AnimalsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SpeciesRepository extends DefaultCrudRepository<
  Species,
  typeof Species.prototype.id,
  SpeciesRelations
> {

  public readonly animal: BelongsToAccessor<Animal, typeof Species.prototype.id>;

  constructor(
    @inject('datasources.animals') dataSource: AnimalsDataSource) {
    super(Species, dataSource);
  }
}
