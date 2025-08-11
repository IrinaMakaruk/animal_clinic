import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WildAnimal } from '../entities';
import { CreateWildAnimalDto } from '../dto';

@Injectable()
export class WildAnimalsService {
  constructor(
    @InjectRepository(WildAnimal)
    private readonly wildAnimalRepository: Repository<WildAnimal>,
  ) {}

  async create(createWildAnimalDto: CreateWildAnimalDto): Promise<WildAnimal> {
    const wildAnimal = this.wildAnimalRepository.create({
      ...createWildAnimalDto,
      dateFound: createWildAnimalDto.dateFound ? new Date(createWildAnimalDto.dateFound) : undefined,
    });
    
    const savedWildAnimal = await this.wildAnimalRepository.save(wildAnimal);
    return this.findOne(savedWildAnimal.id);
  }

  async findAll(): Promise<WildAnimal[]> {
    return this.wildAnimalRepository.find({
      relations: ['species'],
    });
  }

  async findOne(id: number): Promise<WildAnimal> {
    const wildAnimal = await this.wildAnimalRepository.findOne({
      where: { id },
      relations: ['species'],
    });

    if (!wildAnimal) {
      throw new NotFoundException(`Wild animal with ID ${id} not found`);
    }

    return wildAnimal;
  }

  async update(id: number, updateWildAnimalDto: Partial<CreateWildAnimalDto>): Promise<WildAnimal> {
    const wildAnimal = await this.findOne(id);
    
    const updateData = {
      ...updateWildAnimalDto,
      dateFound: updateWildAnimalDto.dateFound ? new Date(updateWildAnimalDto.dateFound) : undefined,
    };

    Object.assign(wildAnimal, updateData);
    await this.wildAnimalRepository.save(wildAnimal);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const wildAnimal = await this.findOne(id);
    await this.wildAnimalRepository.remove(wildAnimal);
  }
}