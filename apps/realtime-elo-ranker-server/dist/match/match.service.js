"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../player/player.service");
let MatchService = class MatchService {
    constructor(playerService) {
        this.playerService = playerService;
        this.K = 32;
    }
    updateRankings(matchResultDto) {
        const { winner, loser, draw } = matchResultDto;
        const winnerPlayer = this.playerService.getPlayer(winner);
        const loserPlayer = this.playerService.getPlayer(loser);
        if (winnerPlayer && loserPlayer) {
            if (!draw && (!winnerPlayer || !loserPlayer)) {
                throw new common_1.HttpException({
                    code: 422,
                    message: "Le gagnant ou le perdant indiqué n'existe pas",
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
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
    calculateWinProbability(ra, rb) {
        return 1 / (1 + Math.pow(10, (rb - ra) / 400));
    }
    calculateNewRank(ro, w, we) {
        return Math.round(ro + this.K * (w - we));
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [player_service_1.PlayerService])
], MatchService);
//# sourceMappingURL=match.service.js.map