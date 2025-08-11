import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  del,
  requestBody,
} from '@loopback/rest';
import {WildAnimal} from '../models';
import {WildAnimalRepository} from '../repositories';

export class WildAnimalController {
  constructor(
    @repository(WildAnimalRepository)
    public wildAnimalRepository : WildAnimalRepository,
  ) {}

  @post('/wild-animals', {
    responses: {
      '200': {
        description: 'WildAnimal model instance',
        content: {'application/json': {schema: getModelSchemaRef(WildAnimal)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WildAnimal, {
            title: 'NewWildAnimal',
            exclude: ['id'],
          }),
        },
      },
    })
    wildAnimal: Omit<WildAnimal, 'id'>,
  ): Promise<WildAnimal> {
    return this.wildAnimalRepository.create(wildAnimal);
  }

  @get('/wild-animals/count', {
    responses: {
      '200': {
        description: 'WildAnimal model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(WildAnimal) where?: Where<WildAnimal>,
  ): Promise<Count> {
    return this.wildAnimalRepository.count(where);
  }

  @get('/wild-animals', {
    responses: {
      '200': {
        description: 'Array of WildAnimal model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(WildAnimal, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(WildAnimal) filter?: Filter<WildAnimal>,
  ): Promise<WildAnimal[]> {
    return this.wildAnimalRepository.find(filter);
  }

  @del('/wild-animals/{id}', {
    responses: {
      '204': {
        description: 'WildAnimal DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.wildAnimalRepository.deleteById(id);
  }
}
