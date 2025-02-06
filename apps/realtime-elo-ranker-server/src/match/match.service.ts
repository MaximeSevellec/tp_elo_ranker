import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PlayerService } from '../player/player.service';
import { MatchResultDto } from './match.controller';
import { AppService } from '../app.service';

@Injectable()
export class MatchService {
    private readonly K = 32;

    constructor(private readonly playerService: PlayerService, private readonly appService: AppService) {}

    async updateRankings(matchResultDto: MatchResultDto) {
        const { winner, loser, draw } = matchResultDto;

        const winnerPlayer = await this.playerService.getPlayer(winner);
        const loserPlayer = await this.playerService.getPlayer(loser);

        if (winnerPlayer && loserPlayer) {
        if (!draw && (!winnerPlayer || !loserPlayer)) {
            throw new HttpException({
                code: 422,
                message: "Le gagnant ou le perdant indiqué n'existe pas",
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }


        if (draw) {
            const winnerWe = this.calculateWinProbability(winnerPlayer.rank, loserPlayer.rank);
            const loserWe = this.calculateWinProbability(loserPlayer.rank, winnerPlayer.rank);

            winnerPlayer.rank = this.calculateNewRank(winnerPlayer.rank, 0.5, winnerWe);
            loserPlayer.rank = this.calculateNewRank(loserPlayer.rank, 0.5, loserWe);

            this.playerService.updatePlayer(winnerPlayer);
            this.playerService.updatePlayer(loserPlayer);

            return {
                code: 200,
                message: "Match nul publié avec succès",
                details: {
                    winner: winnerPlayer,
                    loser: loserPlayer,
                },
            };
        }

        const winnerWe = this.calculateWinProbability(winnerPlayer.rank, loserPlayer.rank);
        const loserWe = this.calculateWinProbability(loserPlayer.rank, winnerPlayer.rank);

        winnerPlayer.rank = this.calculateNewRank(winnerPlayer.rank, 1, winnerWe);
        loserPlayer.rank = this.calculateNewRank(loserPlayer.rank, 0, loserWe);

        this.playerService.updatePlayer(winnerPlayer);
        this.playerService.updatePlayer(loserPlayer);
        this.appService.sendRankingUpdateEvents(winnerPlayer);

        return {
            code: 200,
            message: "Résultats du match publiés avec succès",
            details: {
                winner: winnerPlayer,
                loser: loserPlayer,
            },
        };
    }
    }

    private calculateWinProbability(ra: number, rb: number): number {
        return 1 / (1 + Math.pow(10, (rb - ra) / 400));
    }

    private calculateNewRank(ro: number, w: number, we: number): number {
        return Math.round(ro + this.K * (w - we));
    }
}
