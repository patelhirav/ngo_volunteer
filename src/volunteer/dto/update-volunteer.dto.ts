import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVolunteerProfileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  readonly profilePhoto?: any;

  @ApiProperty({ example: 25, required: false })
  @IsOptional()
  @IsNumber()
  readonly age?: number;

  @ApiProperty({ example: 'Male', required: false })
  @IsOptional()
  @IsString()
  readonly gender?: string;

  @ApiProperty({ example: '9876543210', required: false })
  @IsOptional()
  @IsString()
  readonly mobileNo?: string;

  @ApiProperty({ example: 'Mumbai', required: false })
  @IsOptional()
  @IsString()
  readonly city?: string;

  @ApiProperty({ example: 'Delhi', required: false })
  @IsOptional()
  @IsString()
  readonly preferredCity?: string;

  @ApiProperty({ example: 'Web Development, Graphic Design', required: false })
  @IsOptional()
  @IsString()
  readonly skills?: string;
  name: string;
  email: string;
}
