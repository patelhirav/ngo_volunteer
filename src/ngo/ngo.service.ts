import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NGO } from './ngo.entity';
import { SignupNGODto } from './dto/signup-ngo.dto';
import { UpdateVolunteerProfileDto } from './dto/update-ngo-profile.dto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

@Injectable()
export class NGOService {
  constructor(
    @InjectRepository(NGO)
    private readonly ngoRepository: Repository<NGO>,
  ) {}

  async signup(data: SignupNGODto): Promise<NGO> {
    const email = data.email.trim();
    const password = data.password.trim();

    // Check if the NGO with the same email already exists
    const existingNGO = await this.ngoRepository.findOne({ where: { email } });
    if (existingNGO) {
      throw new BadRequestException('NGO with this email already exists');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new NGO
    const ngo = this.ngoRepository.create({
      ...data,
      email, // Ensure trimmed email is used
      password: hashedPassword, // Securely store hashed password
    });

    return this.ngoRepository.save(ngo);
  }

  async updateProfile(
    id: number,
    data: UpdateVolunteerProfileDto,
  ): Promise<NGO> {
    const ngo = await this.ngoRepository.findOne({
      where: { id: new ObjectId(id) },
    });
    if (!ngo) throw new NotFoundException('NGO not found');

    Object.assign(ngo, data);
    return this.ngoRepository.save(ngo);
  }
}
