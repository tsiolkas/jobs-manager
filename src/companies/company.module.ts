import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [SharedModule],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}
