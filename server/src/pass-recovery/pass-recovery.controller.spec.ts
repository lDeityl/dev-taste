import { Test, TestingModule } from '@nestjs/testing';
import { PassRecoveryController } from './pass-recovery.controller';

describe('PassRecoveryController', () => {
  let controller: PassRecoveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassRecoveryController],
    }).compile();

    controller = module.get<PassRecoveryController>(PassRecoveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
