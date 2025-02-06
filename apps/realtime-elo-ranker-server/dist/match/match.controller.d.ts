import { MatchService } from './match.service';
export declare class MatchResultDto {
    winner: string;
    loser: string;
    draw: boolean;
}
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    publishMatchResult(matchResultDto: MatchResultDto): Promise<{
        code: number;
        message: string;
        details: {
            winner: import("../bd/player.entity").Player;
            loser: import("../bd/player.entity").Player;
        };
    } | undefined>;
}
