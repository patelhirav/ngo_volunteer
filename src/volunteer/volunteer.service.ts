import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volunteer } from './volunteer.entity';
import { SignupVolunteerDto } from './dto/signup-volunteer.dto';
import { UpdateVolunteerProfileDto } from './dto/update-volunteer.dto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

@Injectable()
export class VolunteerService {
  ngoRepository: any;
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepository: Repository<Volunteer>,
  ) {}

  async signup(data: SignupVolunteerDto): Promise<Volunteer> {
    // Trim email and password to prevent accidental spaces
    const email = data.email.trim();
    const password = data.password.trim();

    // Check if the volunteer already exists
    const existingUser =
      (await this.volunteerRepository.findOne({ where: { email } })) ||
      (await this.ngoRepository.findOne({ where: { email } }));

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new volunteer entry
    const volunteer = this.volunteerRepository.create({
      ...data,
      email, // Ensure trimmed email is used
      password: hashedPassword, // Store hashed password
    });

    // Save and return the volunteer
    return this.volunteerRepository.save(volunteer);
  }
  async updateProfile(
    id: string,
    data: UpdateVolunteerProfileDto,
  ): Promise<Volunteer> {
    const volunteer = await this.volunteerRepository.findOne({
      where: { id: new ObjectId(id) },
    });

    if (!volunteer) throw new NotFoundException('Volunteer not found');

    Object.assign(volunteer, data);
    return this.volunteerRepository.save(volunteer);
  }
}
