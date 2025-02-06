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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ],
  controllers: [AppController, PlayerController, RankingController, MatchController, RankingEventController],
  providers: [AppService, PlayerService, MatchService, RankingService],
})
export class AppModule {}
