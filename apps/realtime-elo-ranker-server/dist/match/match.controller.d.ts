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
            winner: import("../player/player.entity").Player;
            loser: import("../player/player.entity").Player;
        };
    } | undefined>;
}
