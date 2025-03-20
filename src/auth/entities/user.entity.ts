import {
  Entity,
  ObjectIdColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  // @Index({ unique: true, sparse: true })
  email: string;

  @Column()
  password: string;

  // @Column({ default: 'volunteer' }) // Can be 'ngo' or 'volunteer'
  // role: string;
}
