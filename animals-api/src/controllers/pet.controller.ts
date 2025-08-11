import { repository } from '@loopback/repository';
import {
  param,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';

import { Pet } from '../models';
import { PetRepository } from '../repositories';

export class PetController {
  constructor(
    @repository(PetRepository)
    public petRepository : PetRepository,
  ) {}

  @patch('/pets/{id}', {
    responses: {
      '204': {
        description: 'Pet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pet, {partial: true}),
        },
      },
    })
    pet: Pet,
  ): Promise<void> {
    await this.petRepository.updateById(id, pet);
  }

  @put('/pets/{id}', {
    responses: {
      '204': {
        description: 'Pet PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pet: Pet,
  ): Promise<void> {
    await this.petRepository.replaceById(id, pet);
  }

  @del('/pets/{id}', {
    responses: {
      '204': {
        description: 'Pet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.petRepository.deleteById(id);
  }
}
