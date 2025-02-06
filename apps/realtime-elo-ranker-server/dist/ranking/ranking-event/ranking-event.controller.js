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
exports.RankingEventController = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const rxjs_1 = require("rxjs");
let RankingEventController = class RankingEventController {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    subscribeToRankingEvents() {
        return new rxjs_1.Observable(observer => {
            const onRankingUpdate = (data) => {
                observer.next(new MessageEvent('message', {
                    data: data
                }));
            };
            const onError = (error) => {
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
};
exports.RankingEventController = RankingEventController;
__decorate([
    (0, common_1.Sse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RankingEventController.prototype, "subscribeToRankingEvents", null);
exports.RankingEventController = RankingEventController = __decorate([
    (0, common_1.Controller)('api/ranking/events'),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], RankingEventController);
//# sourceMappingURL=ranking-event.controller.js.map