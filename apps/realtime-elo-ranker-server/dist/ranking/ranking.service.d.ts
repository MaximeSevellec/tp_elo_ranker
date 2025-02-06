import { PlayerService } from '../player/player.service';
export declare class RankingService {
    private readonly playerService;
    constructor(playerService: PlayerService);
    getRanking(): Promise<import("../bd/player.entity").Player[]>;
}
