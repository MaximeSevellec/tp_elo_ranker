import { Controller, Post, Body } from '@nestjs/common';
import { MatchService } from './match.service';

export class MatchResultDto {
    winner: string; // Identifiant du gagnant
    loser: string;  // Identifiant du perdant
    draw: boolean;  // Indique si c'est un match nul
}

@Controller('api/match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Post()
    async publishMatchResult(@Body() matchResultDto: MatchResultDto) {
        return this.matchService.updateRankings(matchResultDto);
    }
}