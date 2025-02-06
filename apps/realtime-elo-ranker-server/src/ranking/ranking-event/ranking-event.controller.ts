import { Controller,Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';

@Controller('api/ranking/events')
export class RankingEventController {

    constructor(private readonly eventEmitter: EventEmitter2) { }

    @Sse()
    subscribeToRankingEvents() {
        return new Observable(observer => {
            const onRankingUpdate = (data: { type: string, player: { id: string, rank: number } }) => {
                observer.next(new MessageEvent('message', {
                    data: data
                }));
            };

            const onError = (error: any) => {
                observer.error(error);
                observer.complete();
            };

            this.eventEmitter.on('RankingUpdate', onRankingUpdate);
            this.eventEmitter.on('error', onError);

            return () => {
                this.eventEmitter.off('RankingUpdate', onRankingUpdate);
                this.eventEmitter.off('error', onError);
            };
        });
    }

}
