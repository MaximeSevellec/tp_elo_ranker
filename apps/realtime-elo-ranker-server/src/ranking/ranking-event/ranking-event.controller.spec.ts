import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingEventController } from './ranking-event.controller';
import { Observable } from 'rxjs';

describe('RankingEventController', () => {
  let controller: RankingEventController;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    eventEmitter = new EventEmitter2();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingEventController],
      providers: [{ provide: EventEmitter2, useValue: eventEmitter }],
    }).compile();

    controller = module.get<RankingEventController>(RankingEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should subscribe to ranking events', done => {
    const observable = controller.subscribeToRankingEvents();
    expect(observable).toBeInstanceOf(Observable);

    const subscription = observable.subscribe({
      next: event => {
        expect((event as any).data).toEqual({ type: 'update', player: { id: '1', rank: 1 } });
        subscription.unsubscribe();
        done();
      },
      error: err => {
        subscription.unsubscribe();
        done.fail(err);
      },
    });

    eventEmitter.emit('RankingUpdate', { type: 'update', player: { id: '1', rank: 1 } });
  });

  it('should handle errors', done => {
    const observable = controller.subscribeToRankingEvents();
    expect(observable).toBeInstanceOf(Observable);

    const subscription = observable.subscribe({
      next: () => {
        subscription.unsubscribe();
        done.fail('Expected an error, but got a next event');
      },
      error: err => {
        expect(err).toBe('Test error');
        subscription.unsubscribe();
        done();
      },
    });

    eventEmitter.emit('error', 'Test error');
  });
});
