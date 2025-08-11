import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Owner } from './owner.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @OneToOne(() => Owner, owner => owner.address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;
}