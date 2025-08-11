import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Address } from './address.entity';
import { Pet } from './pet.entity';

@Entity('owners')
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  email?: string;

  @OneToOne(() => Address, address => address.owner, { cascade: true })
  address: Address;

  @OneToMany(() => Pet, pet => pet.owner)
  pets: Pet[];
}