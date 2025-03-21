import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Otp } from './entities/otp.entity';
import { Volunteer } from '../volunteer/volunteer.entity';
import { NGO } from '../ngo/ngo.entity';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    @InjectRepository(Volunteer)
    private readonly volunteerRepository: Repository<Volunteer>,
    @InjectRepository(NGO) private readonly ngoRepository: Repository<NGO>,
    private readonly jwtService: JwtService,
  ) {}

  async generateOtp(email: string) {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    let userType = '';

    let user: Volunteer | NGO | null = await this.volunteerRepository.findOne({
      where: { email },
    });

    if (user) {
      userType = 'volunteer';
    } else {
      user = await this.ngoRepository.findOne({ where: { email } });
      if (user) {
        userType = 'ngo';
      }
    }

    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
      });
    }

    await this.otpRepository.save({ email, otp: otpCode });

    await this.sendOtpEmail(email, otpCode);

    console.log(`OTP for ${email}: ${otpCode} (Type: ${userType})`);
    return {
      statusCode: 200,
      message: 'OTP sent successfully',
      email,
      userType,
    };
  }

  private async sendOtpEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'patelhirav2212@gmail.com',
        pass: 'oqzb aajk mamu yhyf',
      },
    });

    const mailOptions = {
      from: 'patelhirav2212@gmail.com',
      to: email,
      subject: 'Your OTP Code for Password Reset',
      text: `Your OTP Code is: ${otp}. It is valid for 10 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}`);
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'Failed to send OTP email',
      });
    }
  }

  async verifyOtp(email: string, otp: string) {
    const otpEntry = await this.otpRepository.findOne({
      where: { email, otp },
    });

    if (!otpEntry) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid or expired OTP',
      });
    }

    await this.otpRepository.delete({ email });

    return {
      statusCode: 200,
      message: 'OTP verified successfully',
    };
  }

  async resetPassword(email: string, newPassword: string) {
    let user: Volunteer | NGO | null = await this.volunteerRepository.findOne({
      where: { email },
    });

    if (!user) {
      user = await this.ngoRepository.findOne({ where: { email } });
    }

    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    if (user instanceof Volunteer) {
      await this.volunteerRepository.save(user);
    } else {
      await this.ngoRepository.save(user);
    }

    await this.otpRepository.delete({ email });

    return {
      statusCode: 200,
      message: 'Password reset successfully',
    };
  }
}
