import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';

@Module({
  imports: [SharedModule],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
