import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Volunteer {
  @ObjectIdColumn() 
  id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobileNo: string;

  @Column({ select: false })
  password: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  preferredCity: string;

  @Column({ nullable: true })
  skills: string;

  @Column({ nullable: true })
  profilePhoto: string;
}
