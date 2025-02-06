import { PlayerService } from '../player/player.service';
import { MatchResultDto } from './match.controller';
import { AppService } from 'src/app.service';
export declare class MatchService {
    private readonly playerService;
    private readonly appService;
    private readonly K;
    constructor(playerService: PlayerService, appService: AppService);
    updateRankings(matchResultDto: MatchResultDto): Promise<{
        code: number;
        message: string;
        details: {
            winner: import("../bd/player.entity").Player;
            loser: import("../bd/player.entity").Player;
        };
    } | undefined>;
    private calculateWinProbability;
    private calculateNewRank;
}
