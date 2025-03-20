import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { SignupVolunteerDto } from './dto/signup-volunteer.dto';
import { UpdateVolunteerProfileDto } from './dto/update-volunteer.dto';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post('signup')
  async signup(@Body() signupVolunteerDto: SignupVolunteerDto) {
    return this.volunteerService.signup(signupVolunteerDto);
  }

  @Put('profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateVolunteerProfileDto,
  ) {
    return this.volunteerService.updateProfile(id, updateProfileDto);
  }
}
