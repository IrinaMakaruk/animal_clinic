import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Owner } from './owner.entity';
import { Species } from './species.entity';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  weight?: number;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @Column({ name: 'species_id', nullable: true })
  speciesId?: number;

  @ManyToOne(() => Owner, owner => owner.pets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  @ManyToOne(() => Species, species => species.pets)
  @JoinColumn({ name: 'species_id' })
  species: Species;
}