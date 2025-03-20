import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { Otp } from './entities/otp.entity';
import { User } from '../auth/entities/user.entity';
import { Volunteer } from 'src/volunteer/volunteer.entity';
import { NGO } from 'src/ngo/ngo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Otp, User, Volunteer, NGO])],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
