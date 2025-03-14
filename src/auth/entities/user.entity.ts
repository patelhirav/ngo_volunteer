import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  NGO = 'ngo',
  VOLUNTEER = 'volunteer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  mobileNumber: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
