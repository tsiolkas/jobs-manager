import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [SharedModule],
  providers: [JobService],
  controllers: [JobController]
})
export class JobModule {}
