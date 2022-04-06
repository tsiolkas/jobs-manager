import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { SharedModule } from './shared/shared.module';
import { CompanyModule } from './companies/company.module';
import { JobModule } from './jobs/job.module';
import { CompanyService } from './companies/company.service';
import { JobService } from './jobs/job.service';


describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UserModule, SharedModule, CompanyModule, JobModule],
      controllers: [AppController],
      providers: [CompanyService, JobService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should have been called', () => {
      const spy = jest.spyOn(appController, 'signUp').mockImplementation(async () => null);
      appController.signUp({ username: "achilleas", password: "1234", fullname: "Achilleas Tsiolkas" });
      expect(spy).toHaveBeenCalled();
    });
  });
});
