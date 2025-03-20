import { IsString, IsEmail, IsNumber, MinLength } from 'class-validator';

export class SignupVolunteerDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly mobileNo: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly gender: string;

  @IsString()
  readonly city: string;
}
