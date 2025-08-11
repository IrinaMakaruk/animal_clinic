import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner, Address } from '../entities';
import { CreateOwnerDto } from '../dto';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const { address, ...ownerData } = createOwnerDto;
    
    const owner = this.ownerRepository.create(ownerData);
    const savedOwner = await this.ownerRepository.save(owner);

    if (address) {
      const newAddress = this.addressRepository.create({
        ...address,
        ownerId: savedOwner.id,
      });
      await this.addressRepository.save(newAddress);
    }

    return this.findOne(savedOwner.id);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerRepository.find({
      relations: ['address', 'pets', 'pets.species'],
    });
  }

  async findOne(id: number): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({
      where: { id },
      relations: ['address', 'pets', 'pets.species'],
    });

    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    return owner;
  }

  async update(id: number, updateOwnerDto: Partial<CreateOwnerDto>): Promise<Owner> {
    const owner = await this.findOne(id);
    const { address, ...ownerData } = updateOwnerDto;

    // Update owner data
    Object.assign(owner, ownerData);
    await this.ownerRepository.save(owner);

    // Update address if provided
    if (address) {
      if (owner.address) {
        Object.assign(owner.address, address);
        await this.addressRepository.save(owner.address);
      } else {
        const newAddress = this.addressRepository.create({
          ...address,
          ownerId: owner.id,
        });
        await this.addressRepository.save(newAddress);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const owner = await this.findOne(id);
    await this.ownerRepository.remove(owner);
  }
}