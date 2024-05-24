import { Test, TestingModule } from '@nestjs/testing';
import { PassRecoveryService } from './pass-recovery.service';

describe('PassRecoveryService', () => {
  let service: PassRecoveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassRecoveryService],
    }).compile();

    service = module.get<PassRecoveryService>(PassRecoveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
