import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  // 📌 Generate OTP
  @Post('generate')
  async generateOtp(@Body('email') email: string) {
    return this.otpService.generateOtp(email);
  }

  // 📌 Verify OTP & Reset Password
  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    return this.otpService.verifyOtp(email, otp);
  }

  // 📌 Reset Password (if OTP already verified)
  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.otpService.resetPassword(email, newPassword);
  }
}
