import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from '../entities';
import { CreatePetDto } from '../dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const pet = this.petRepository.create({
      ...createPetDto,
      dateOfBirth: createPetDto.dateOfBirth ? new Date(createPetDto.dateOfBirth) : undefined,
    });
    
    const savedPet = await this.petRepository.save(pet);
    return this.findOne(savedPet.id);
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find({
      relations: ['owner', 'species'],
    });
  }

  async findByOwner(ownerId: number): Promise<Pet[]> {
    return this.petRepository.find({
      where: { ownerId },
      relations: ['species'],
    });
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['owner', 'species'],
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    return pet;
  }

  async update(id: number, updatePetDto: Partial<CreatePetDto>): Promise<Pet> {
    const pet = await this.findOne(id);
    
    const updateData = {
      ...updatePetDto,
      dateOfBirth: updatePetDto.dateOfBirth ? new Date(updatePetDto.dateOfBirth) : undefined,
    };

    Object.assign(pet, updateData);
    await this.petRepository.save(pet);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepository.remove(pet);
  }
}