import { IsString, IsOptional, IsMobilePhone } from 'class-validator';

export class UpdateVolunteerProfileDto {
  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  age?: number;

  @IsOptional()
  @IsMobilePhone()
  mobileNo?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  preferredCity?: string;

  @IsOptional()
  @IsString()
  skills?: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;
}
