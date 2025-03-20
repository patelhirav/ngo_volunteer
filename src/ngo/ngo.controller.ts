import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { NGOService } from './ngo.service';
import { SignupNGODto } from './dto/signup-ngo.dto';
import { UpdateVolunteerProfileDto } from './dto/update-ngo-profile.dto';

@Controller('ngo')
export class NGOController {
  constructor(private readonly ngoService: NGOService) {}

  @Post('signup')
  async signup(@Body() signupNGODto: SignupNGODto) {
    return this.ngoService.signup(signupNGODto);
  }

  @Put('profile/:id')
  async updateProfile(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateVolunteerProfileDto,
  ) {
    return this.ngoService.updateProfile(id, updateProfileDto);
  }
}
