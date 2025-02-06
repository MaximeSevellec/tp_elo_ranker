import { PlayerService } from '../player/player.service';
import { MatchResultDto } from './match.controller';
export declare class MatchService {
    private readonly playerService;
    private readonly K;
    constructor(playerService: PlayerService);
    updateRankings(matchResultDto: MatchResultDto): {
        code: number;
        message: string;
        details: {
            winner: import("../player/player.entity").Player;
            loser: import("../player/player.entity").Player;
        };
    } | undefined;
    private calculateWinProbability;
    private calculateNewRank;
}
