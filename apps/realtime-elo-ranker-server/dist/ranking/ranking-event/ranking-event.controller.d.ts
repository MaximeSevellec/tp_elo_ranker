import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
export declare class RankingEventController {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    subscribeToRankingEvents(): Observable<unknown>;
}
