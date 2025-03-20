import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Column } from 'typeorm';

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otp: string;

  @Column({ default: false })
  isOtpVerified: boolean; 
}
