import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NGO } from './ngo.entity';
import { NGOService } from './ngo.service';
import { NGOController } from './ngo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NGO])],
  controllers: [NGOController],
  providers: [NGOService],
  exports: [NGOService],
})
export class NGOModule {}
