import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../shared/shared.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';

describe('JobsService', () => {
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [JobService],
      controllers: [JobController]
    }).compile();

    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('insertJob should be called', () => {
    const spy = jest.spyOn(service, 'createJob').mockImplementation(async () => null);
    service.createJob({ title: "title1", description: "description1", company_id: 1 });
    expect(spy).toHaveBeenCalled();
  });

  it('updateJob should be called', () => {
    const spy = jest.spyOn(service, 'updateJob').mockImplementation(async () => null);
    service.updateJob({ title: "title1", description: "description1", company_id: 1, deleted: false },1);
    expect(spy).toHaveBeenCalled();
  });

  it('deleteJob should be called', () => {
    const spy = jest.spyOn(service, 'deleteJob').mockImplementation(async () => null);
    service.deleteJob(1);
    expect(spy).toHaveBeenCalled();
  });
});
