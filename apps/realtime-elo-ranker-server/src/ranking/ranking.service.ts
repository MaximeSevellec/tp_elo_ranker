import { Injectable } from '@nestjs/common';
import { PlayerService } from '../player/player.service';

@Injectable()
export class RankingService {
    constructor(private readonly playerService: PlayerService) {}

    getRanking() {
        return this.playerService.getPlayers();
    }
}
