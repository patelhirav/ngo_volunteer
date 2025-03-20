import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  // @ApiProperty({
  //   example: 'volunteer',
  //   description: 'User type: "volunteer" or "ngo"',
  //   enum: ['volunteer', 'ngo'],
  // })
  // @IsString()
  // @IsIn(['volunteer', 'ngo'])
  // @IsNotEmpty()
  // userType: 'volunteer' | 'ngo';
}
