import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_credentials')
export class UserCredentials {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User, user => user.userCredentials, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}