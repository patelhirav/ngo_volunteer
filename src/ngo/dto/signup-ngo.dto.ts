import { IsString, IsEmail, IsMobilePhone, MinLength } from 'class-validator';

export class SignupNGODto {
  @IsString()
  nameOfOrganization: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  mobileNo: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  city: string;
}
