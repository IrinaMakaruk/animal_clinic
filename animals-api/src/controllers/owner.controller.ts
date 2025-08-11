import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Owner} from '../models';
import {OwnerRepository} from '../repositories';

// import { authenticate } from '@loopback/authentication';

// @authenticate('jwt')
export class OwnerController {
  constructor(
    @repository(OwnerRepository)
    public ownerRepository : OwnerRepository,
  ) {}

  @post('/owners', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Owner)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {
            title: 'NewOwner',
            exclude: ['id'],
          }),
        },
      },
    })
    owner: Omit<Owner, 'id'>,
  ): Promise<Owner> {
    return this.ownerRepository.create(owner);
  }

  @get('/owners/count', {
    responses: {
      '200': {
        description: 'Owner model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Owner) where?: Where<Owner>,
  ): Promise<Count> {
    return this.ownerRepository.count(where);
  }

  @get('/owners', {
    responses: {
      '200': {
        description: 'Array of Owner model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Owner, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Owner) filter?: Filter<Owner>,
  ): Promise<Owner[]> {
    return this.ownerRepository.find(filter);
  }

  @get('/owners/{id}', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Owner, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Owner, {exclude: 'where'}) filter?: FilterExcludingWhere<Owner>
  ): Promise<Owner> {
    return this.ownerRepository.findById(id, filter);
  }

  @patch('/owners/{id}', {
    responses: {
      '204': {
        description: 'Owner PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {partial: true}),
        },
      },
    })
    owner: Owner,
  ): Promise<void> {
    await this.ownerRepository.updateById(id, owner);
  }

  @del('/owners/{id}', {
    responses: {
      '204': {
        description: 'Owner DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ownerRepository.deleteById(id);
  }
}
