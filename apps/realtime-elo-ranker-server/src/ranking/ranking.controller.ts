import { Controller, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('api/ranking')
export class RankingController {
    constructor(private readonly rankingService: RankingService) {}

    @Get()
    async getRanking() {
        return this.rankingService.getRanking();
    }
}