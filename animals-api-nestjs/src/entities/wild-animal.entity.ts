import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Species } from './species.entity';

@Entity('wild_animals')
export class WildAnimal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  habitat?: string;

  @Column({ name: 'is_endangered', default: false })
  isEndangered: boolean;

  @Column({ name: 'date_found', type: 'date', nullable: true })
  dateFound?: Date;

  @Column({ name: 'species_id', nullable: true })
  speciesId?: number;

  @ManyToOne(() => Species, species => species.wildAnimals)
  @JoinColumn({ name: 'species_id' })
  species: Species;
}