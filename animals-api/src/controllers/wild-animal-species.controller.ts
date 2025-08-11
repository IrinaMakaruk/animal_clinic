import { repository } from '@loopback/repository';
import {
  getModelSchemaRef,
  param,
  post,
  requestBody,
} from '@loopback/rest';
import {
  WildAnimal,
  Species,
} from '../models';
import {WildAnimalRepository} from '../repositories';

export class WildAnimalSpeciesController {
  constructor(
    @repository(WildAnimalRepository) protected wildAnimalRepository: WildAnimalRepository,
  ) { }

  @post('/wild-animals/{id}/species', {
    responses: {
      '200': {
        description: 'WildAnimal model instance',
        content: {'application/json': {schema: getModelSchemaRef(Species)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof WildAnimal.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Species, {
            title: 'NewSpeciesInWildAnimal',
            exclude: ['id'],
            optional: ['wildAnimalId']
          }),
        },
      },
    }) species: Omit<Species, 'id'>,
  ): Promise<Species> {
    return this.wildAnimalRepository.species(id).create(species);
  }
}
