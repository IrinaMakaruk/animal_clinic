import { Filter, repository } from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Owner,
  Pet,
} from '../models';
import { OwnerRepository } from '../repositories';

export class OwnerPetController {
  constructor(
    @repository(OwnerRepository) protected ownerRepository: OwnerRepository,
  ) { }

  @get('/owners/{id}/pets', {
    responses: {
      '200': {
        description: 'Array of Owner has many Pet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pet)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pet>,
  ): Promise<Pet[]> {
    return this.ownerRepository.pets(id).find(filter);
  }

  @post('/owners/{id}/pets', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pet)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Owner.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pet, {
            title: 'NewPetInOwner',
            exclude: ['id'],
            optional: ['ownerId']
          }),
        },
      },
    }) pet: Omit<Pet, 'id'>,
  ): Promise<Pet> {
    return this.ownerRepository.pets(id).create(pet);
  }
}
