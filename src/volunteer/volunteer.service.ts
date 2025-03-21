import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volunteer } from './volunteer.entity';
import { NGO } from '../ngo/ngo.entity'; // ✅ Import NGO Entity
import { SignupVolunteerDto } from './dto/signup-volunteer.dto';
import { UpdateVolunteerProfileDto } from './dto/update-volunteer.dto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb'; // ✅ Import ObjectId

@Injectable()
export class VolunteerService {
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepository: Repository<Volunteer>,

    @InjectRepository(NGO) // ✅ Inject NGO Repository
    private readonly ngoRepository: Repository<NGO>,
  ) {}

  async signup(data: SignupVolunteerDto): Promise<Volunteer> {
    const email = data.email.trim();
    const password = data.password.trim();

    // ✅ Check if user exists in both Volunteer and NGO tables
    const existingUser =
      (await this.volunteerRepository.findOne({ where: { email } })) ||
      (await this.ngoRepository.findOne({ where: { email } }));

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const volunteer = this.volunteerRepository.create({
      ...data,
      email,
      password: hashedPassword,
    });

    return this.volunteerRepository.save(volunteer);
  }

  async updateProfile(
    id: string,
    data: UpdateVolunteerProfileDto,
  ): Promise<Volunteer> {
    const volunteer = await this.volunteerRepository.findOne({
      where: { id: new ObjectId(id) }, // ✅ Convert id to ObjectId
    });

    if (!volunteer) throw new NotFoundException('Volunteer not found');

    Object.assign(volunteer, data);
    return this.volunteerRepository.save(volunteer);
  }
}
