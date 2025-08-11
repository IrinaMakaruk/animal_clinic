import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {WildAnimal, WildAnimalRelations, Species} from '../models';
import {AnimalsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SpeciesRepository} from './species.repository';

export class WildAnimalRepository extends DefaultCrudRepository<
  WildAnimal,
  typeof WildAnimal.prototype.id,
  WildAnimalRelations
> {

  public readonly species: HasOneRepositoryFactory<Species, typeof WildAnimal.prototype.id>;

  constructor(
    @inject('datasources.animals') dataSource: AnimalsDataSource, @repository.getter('SpeciesRepository') protected speciesRepositoryGetter: Getter<SpeciesRepository>,
  ) {
    super(WildAnimal, dataSource);
    this.species = this.createHasOneRepositoryFactoryFor('species', speciesRepositoryGetter);
    this.registerInclusionResolver('species', this.species.inclusionResolver);
  }
}
