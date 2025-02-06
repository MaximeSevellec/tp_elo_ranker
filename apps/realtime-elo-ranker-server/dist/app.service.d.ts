import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class AppService {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    sendRankingUpdateEvents(data: any): void;
}
