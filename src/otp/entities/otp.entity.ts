import { Entity, Column, CreateDateColumn, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('otp')
export class Otp {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 6 }) // Increased OTP length for security
  otp: string;

  @Column({ default: false })
  isOtpVerified: boolean;

  @CreateDateColumn()
  createdAt: Date; // Automatically set timestamp
}
