import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserCredentials } from './user-credentials.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => UserCredentials, credentials => credentials.user, { cascade: true })
  userCredentials: UserCredentials;
}