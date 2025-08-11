import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';
import { WildAnimal } from './wild-animal.entity';

@Entity('species')
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: 'is_domestic', default: true })
  isDomestic: boolean;

  @OneToMany(() => Pet, pet => pet.species)
  pets: Pet[];

  @OneToMany(() => WildAnimal, wildAnimal => wildAnimal.species)
  wildAnimals: WildAnimal[];
}