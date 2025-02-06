"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("./player.entity");
let PlayerService = class PlayerService {
    constructor() {
        this.players = [];
    }
    getPlayers() {
        return this.players;
    }
    createPlayer(id) {
        const newPlayer = new player_entity_1.Player(id, 1000);
        this.players.push(newPlayer);
        return newPlayer;
    }
    getPlayer(id) {
        return this.players.find(player => player.id === id);
    }
    updatePlayer(updatedPlayer) {
        const index = this.players.findIndex(p => p.id === updatedPlayer.id);
        if (index !== -1) {
            this.players[index] = updatedPlayer;
        }
        return updatedPlayer;
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)()
], PlayerService);
//# sourceMappingURL=player.service.js.map