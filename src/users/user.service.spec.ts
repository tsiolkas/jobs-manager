import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [UserService],
      exports: [UserService]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUser should be called', () => {
    const spy = jest.spyOn(service, 'createUser').mockImplementation(async () => null);
    service.createUser({ username: "achilleas", password: "1234", fullname: "Achilleas Tsiolkas" });
    expect(spy).toHaveBeenCalled();
  });

  it('getUser should be called', () => {
    const spy = jest.spyOn(service, 'getUser').mockImplementation(async () => null);
    service.getUser("achilleas");
    expect(spy).toHaveBeenCalled();
  });
});
