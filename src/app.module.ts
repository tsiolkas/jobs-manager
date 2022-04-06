import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { SharedModule } from './shared/shared.module';
import { CompanyModule } from './companies/company.module';
import { JobModule } from './jobs/job.module';
import { CompanyService } from './companies/company.service';
import { JobService } from './jobs/job.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SharedModule,
    CompanyModule,
    JobModule],
  controllers: [AppController],
  providers: [CompanyService, JobService]
})
export class AppModule {}
