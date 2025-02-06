import { Test, TestingModule } from '@nestjs/testing';
import { MatchController, MatchResultDto } from './match.controller';
import { MatchService } from './match.service';

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: MatchService,
          useValue: {
            updateRankings: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call updateRankings with correct parameters', async () => {
    const matchResultDto: MatchResultDto = {
      winner: 'player1',
      loser: 'player2',
      draw: false,
    };

    await controller.publishMatchResult(matchResultDto);
    expect(service.updateRankings).toHaveBeenCalledWith(matchResultDto);
  });
});
