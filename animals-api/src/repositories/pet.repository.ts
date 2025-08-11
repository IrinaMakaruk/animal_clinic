import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Pet, PetRelations, Owner, Species} from '../models';
import {AnimalsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SpeciesRepository} from './species.repository';
import {OwnerRepository} from './owner.repository';

export class PetRepository extends DefaultCrudRepository<
  Pet,
  typeof Pet.prototype.id,
  PetRelations
> {


  public readonly species: HasOneRepositoryFactory<Species, typeof Pet.prototype.id>;

  public readonly owner: BelongsToAccessor<Owner, typeof Pet.prototype.id>;

  constructor(
    @inject('datasources.animals') dataSource: AnimalsDataSource,
    @repository.getter('SpeciesRepository') protected speciesRepositoryGetter: Getter<SpeciesRepository>,
    @repository.getter('OwnerRepository') protected ownerRepositoryGetter: Getter<OwnerRepository>,
  ) {
    super(Pet, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', ownerRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.species = this.createHasOneRepositoryFactoryFor('species', speciesRepositoryGetter);
    this.registerInclusionResolver('species', this.species.inclusionResolver);
  }
}
