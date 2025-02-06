import { Test, TestingModule } from '@nestjs/testing';
import { RankingEventController } from './ranking-event.controller';

describe('RankingEventController', () => {
  let controller: RankingEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingEventController],
    }).compile();

    controller = module.get<RankingEventController>(RankingEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
