import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty({ message: 'New password should not be empty' })
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;
}
