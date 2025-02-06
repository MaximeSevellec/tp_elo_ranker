import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  
  constructor(private readonly eventEmitter: EventEmitter2){}

  sendRankingUpdateEvents(data: any) {
    this.eventEmitter.emit('RankingUpdate', {
      type: 'RankingUpdate',
      player: data
    });
  }

}
