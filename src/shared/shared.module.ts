import { Module } from '@nestjs/common';
import { AppConfig } from '../app.config';
import { SharedService } from './shared.service';

@Module({
  providers: [SharedService, AppConfig],
  exports: [SharedService]
})
export class SharedModule {}
