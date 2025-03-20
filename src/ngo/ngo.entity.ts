import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';

import { ObjectId } from 'mongodb';

@Entity()
export class NGO {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  nameOfOrganization: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  mobileNo: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  profilePhoto: string;

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  state: string;

  @CreateDateColumn()
  createdAt: Date;
}
