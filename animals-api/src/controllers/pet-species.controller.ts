import {
  Count,
  CountSchema,
  repository,
  Where,
} from '@loopback/repository';
import {
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pet,
  Species,
} from '../models';
import {PetRepository} from '../repositories';

export class PetSpeciesController {
  constructor(
    @repository(PetRepository) protected petRepository: PetRepository,
  ) { }

  @post('/pets/{id}/species', {
    responses: {
      '200': {
        description: 'Pet model instance',
        content: {'application/json': {schema: getModelSchemaRef(Species)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pet.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Species, {
            title: 'NewSpeciesInPet',
            exclude: ['id'],
            optional: ['petId']
          }),
        },
      },
    }) species: Omit<Species, 'id'>,
  ): Promise<Species> {
    return this.petRepository.species(id).create(species);
  }

  @patch('/pets/{id}/species', {
    responses: {
      '200': {
        description: 'Pet.Species PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Species, {partial: true}),
        },
      },
    })
    species: Partial<Species>,
    @param.query.object('where', getWhereSchemaFor(Species)) where?: Where<Species>,
  ): Promise<Count> {
    return this.petRepository.species(id).patch(species, where);
  }
}
