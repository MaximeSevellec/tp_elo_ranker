import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';

describe('RankingController', () => {
  let controller: RankingController;
  let service: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: RankingService,
          useValue: {
            getRanking: jest.fn().mockResolvedValue(['player1', 'player2']),
          },
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return ranking', async () => {
    const result = await controller.getRanking();
    expect(result).toEqual(['player1', 'player2']);
  });

  it('should call getRanking method of RankingService', async () => {
    await controller.getRanking();
    expect(service.getRanking).toHaveBeenCalled();
  });
});
