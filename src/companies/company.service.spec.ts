import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [CompanyService],
      controllers: [CompanyController]
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('insertCompany should be called', () => {
    const spy = jest.spyOn(service, 'createCompany').mockImplementation(async () => null);
    service.createCompany({ name: "title1", vatNo: 1234 });
    expect(spy).toHaveBeenCalled();
  });

  it('updateCompany should be called', () => {
    const spy = jest.spyOn(service, 'updateCompany').mockImplementation(async () => null);
    service.updateCompany({ name: "title1", vatNo: 1234, deleted: false}, 1);
    expect(spy).toHaveBeenCalled();
  });

  it('deleteCompany should be called', () => {
    const spy = jest.spyOn(service, 'deleteCompany').mockImplementation(async () => null);
    service.deleteCompany(1);
    expect(spy).toHaveBeenCalled();
  });
});
