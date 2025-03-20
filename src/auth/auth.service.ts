import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volunteer } from '../volunteer/volunteer.entity';
import { NGO } from '../ngo/ngo.entity'; // Import NGO entity
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepository: Repository<Volunteer>,
    @InjectRepository(NGO) // Inject the NGO repository
    private readonly ngoRepository: Repository<NGO>,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<{ token: string; userType: string }> {
    const { email, password } = data;

    let user;
    let userType = '';

    // 🔍 Check if user is a Volunteer
    user = await this.volunteerRepository.findOne({
      where: { email: email.toLowerCase() },
    });
    if (user) {
      userType = 'volunteer';
    } else {
      // 🔍 Check if user is an NGO
      user = await this.ngoRepository.findOne({
        where: { email: email.toLowerCase() },
      });
      if (user) {
        userType = 'ngo';
      }
    }

    if (!user) {
      console.log('❌ User not found in DB');
      throw new NotFoundException('User not found');
    }

    console.log(`🛠️ Stored Hashed Password: ${user.password}`);

    // 🔑 Compare entered password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('❌ Password does not match');
      throw new UnauthorizedException('Invalid credentials');
    }

    // 🎉 Generate JWT Token
    const payload = {
      id: user.id,
      email: user.email,
      userType, // Send user type in token
    };
    const token = this.jwtService.sign(payload);

    console.log(`🔑 Generated JWT: ${token}`);
    return { token, userType };
  }
}
