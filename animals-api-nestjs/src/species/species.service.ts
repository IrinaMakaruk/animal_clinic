import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Species } from '../entities';
import { CreateSpeciesDto } from '../dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {}

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const species = this.speciesRepository.create(createSpeciesDto);
    return this.speciesRepository.save(species);
  }

  async findAll(): Promise<Species[]> {
    return this.speciesRepository.find({
      relations: ['pets', 'wildAnimals'],
    });
  }

  async findOne(id: number): Promise<Species> {
    const species = await this.speciesRepository.findOne({
      where: { id },
      relations: ['pets', 'wildAnimals'],
    });

    if (!species) {
      throw new NotFoundException(`Species with ID ${id} not found`);
    }

    return species;
  }

  async update(id: number, updateSpeciesDto: Partial<CreateSpeciesDto>): Promise<Species> {
    const species = await this.findOne(id);
    Object.assign(species, updateSpeciesDto);
    await this.speciesRepository.save(species);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const species = await this.findOne(id);
    await this.speciesRepository.remove(species);
  }
}