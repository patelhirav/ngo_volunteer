import {
  Injectable,
  NotFoundException,
  BadRequestException,
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

  async generateOtp(email: string): Promise<string> {
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
      throw new NotFoundException('User not found');
    }

    await this.otpRepository.save({ email, otp: otpCode });

    await this.sendOtpEmail(email, otpCode);

    console.log(`✅ OTP for ${email}: ${otpCode} (Type: ${userType})`);
    return otpCode;
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
      subject: 'Your OTP Code for Login',
      text: `Your OTP Code is: ${otp}. It is valid for 10 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`📧 OTP sent to ${email}`);
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  }

  // 📌 Verify OTP
  // async verifyOtp(
  //   email: string,
  //   otp: string,
  //   newPassword: string,
  // ): Promise<{ message: string }> {
  //   const otpEntry = await this.otpRepository.findOne({
  //     where: { email, otp: otp },
  //   });

  //   if (!otpEntry) {
  //     throw new BadRequestException('Invalid OTP');
  //   }

  //   await this.resetPassword(email, newPassword);

  //   // Delete OTP after successful verification
  //   await this.otpRepository.delete({ email });

  //   return { message: 'OTP verified successfully, password reset' };
  // }

  async verifyOtp(email: string, otp: string) {
    const otpEntry = await this.otpRepository.findOne({
      where: { email, otp: otp },
    });

    if (!otpEntry) {
      throw new BadRequestException('Invalid OTP or OTP expired');
    }

    return { message: 'OTP verified successfully' };
  }

  // async resetPassword(email: string, newPassword: string) {
  //   if (!newPassword) {
  //     throw new BadRequestException('New password is required');
  //   }

  //   let user = await this.volunteerRepository.findOne({ where: { email } });
  //   if (!user) {
  //     const user = await this.ngoRepository.findOne({ where: { email } });
  //     console.log(user);
  //   }

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const hashedPassword = await bcrypt.hash(newPassword, 10);
  //   user.password = hashedPassword;

  //   return user instanceof Volunteer
  //     ? this.volunteerRepository.save(user)
  //     : this.ngoRepository.save(user);
  // }

  async resetPassword(email: string, newPassword: string) {
    let user = await this.volunteerRepository.findOne({ where: { email } });
    if (!user) {
      const user = await this.ngoRepository.findOne({ where: { email } });
      console.log(user);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.otpRepository.delete({ email });

    return user instanceof Volunteer
      ? this.volunteerRepository.save(user)
      : this.ngoRepository.save(user);
  }
}
