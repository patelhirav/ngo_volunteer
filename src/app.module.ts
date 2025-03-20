import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/entities/otp.entity';
import { Volunteer } from './volunteer/volunteer.entity';
import { VolunteerModule } from './volunteer/volunteer.module';
import { NGO } from './ngo/ngo.entity';
import { NGOModule } from './ngo/ngo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://Hirav:Hirav123@cluster0.gcih2.mongodb.net/ngo_volunteer',
      database: 'ngo_volunteer',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [User, Otp, Volunteer, NGO],
      synchronize: true,
    }),
    AuthModule,
    OtpModule,
    VolunteerModule,
    NGOModule,
  ],
})
export class AppModule {}
