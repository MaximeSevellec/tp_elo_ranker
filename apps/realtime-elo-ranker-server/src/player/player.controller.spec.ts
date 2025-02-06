import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            getPlayers: jest.fn().mockResolvedValue(['player1', 'player2']),
            createPlayer: jest.fn().mockResolvedValue('player1'),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPlayers', () => {
    it('should return an array of players', async () => {
      const result = await controller.getPlayers();
      expect(result).toEqual(['player1', 'player2']);
      expect(service.getPlayers).toHaveBeenCalled();
    });
  });

  describe('createPlayer', () => {
    it('should create a player and return the player id', async () => {
      const createPlayerDto = { id: 'player1' };
      const result = await controller.createPlayer(createPlayerDto);
      expect(result).toEqual('player1');
      expect(service.createPlayer).toHaveBeenCalledWith('player1');
    });
  });
});
