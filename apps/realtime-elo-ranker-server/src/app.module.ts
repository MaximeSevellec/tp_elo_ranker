import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerService } from './player/player.service';
import { PlayerController } from './player/player.controller';
import { RankingController } from './ranking/ranking.controller';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';
import { RankingService } from './ranking/ranking.service';
import { RankingEventController } from './ranking/ranking-event/ranking-event.controller';

@Module({
  imports: [],
  controllers: [AppController, PlayerController, RankingController, MatchController, RankingEventController],
  providers: [AppService, PlayerService, MatchService, RankingService],
})
export class AppModule {}
