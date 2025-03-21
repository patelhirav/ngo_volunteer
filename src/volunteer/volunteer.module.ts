import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volunteer } from './volunteer.entity';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { NGO } from 'src/ngo/ngo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer, NGO])],
  controllers: [VolunteerController],
  providers: [VolunteerService],
  exports: [VolunteerService],
})
export class VolunteerModule {}
