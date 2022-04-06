import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from '../app.config';
import { SharedService } from './shared.service';

describe('SharedService', () => {
  let sharedService: SharedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedService, AppConfig],
      exports: [SharedService]
    }).compile();

    sharedService = module.get<SharedService>(SharedService);
  });

  it('should be defined', () => {
    expect(sharedService).toBeDefined();
  });

  it('createUpdateChanges should be called', () => {
    const spy = jest.spyOn(sharedService, 'createUpdateChanges').mockImplementation(async () => null);
    sharedService.createUpdateChanges({ username: "achilleas", password: "1234", fullname: "Achilleas Tsiolkas" });
    expect(spy).toHaveBeenCalled();
  });

  it('createUpdateChanges should be called', () => {
    const spy = jest.spyOn(sharedService, 'query').mockImplementation(async () => null);
    sharedService.query('query',[]);
    expect(spy).toHaveBeenCalled();
  });
});
