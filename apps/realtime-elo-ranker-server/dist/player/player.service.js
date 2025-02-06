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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("../bd/player.entity");
const app_service_1 = require("../app.service");
let PlayerService = class PlayerService {
    constructor(appService) {
        this.appService = appService;
    }
    async getPlayers() {
        return await player_entity_1.Player.find({ order: { rank: 'DESC' } });
    }
    async createPlayer(id) {
        const newPlayer = player_entity_1.Player.create({ id, rank: 1000 });
        await newPlayer.save();
        this.appService.sendRankingUpdateEvents({ id: newPlayer.id, rank: newPlayer.rank });
        return newPlayer;
    }
    async getPlayer(id) {
        return await player_entity_1.Player.findOne({ where: { id: id } });
    }
    async updatePlayer(updatedPlayer) {
        await updatedPlayer.save();
        return updatedPlayer;
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], PlayerService);
//# sourceMappingURL=player.service.js.map