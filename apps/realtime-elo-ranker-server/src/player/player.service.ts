import { Injectable } from '@nestjs/common';
import { Player } from '../bd/player.entity'; // Créer un fichier séparé pour Player
import { AppService } from '../app.service';

@Injectable()
export class PlayerService {

    constructor(private readonly appService: AppService){}

    async getPlayers(): Promise<Player[]> {
        return await Player.find({ order: { rank: 'DESC' } });
    }

    async createPlayer(id: string): Promise<Player> {
        const newPlayer = Player.create({ id, rank: 1000 });
        await newPlayer.save();
        this.appService.sendRankingUpdateEvents({ id: newPlayer.id, rank: newPlayer.rank });
        return newPlayer;
    }

    async getPlayer(id: string): Promise<Player | null> {
        return await Player.findOne({ where: { id: id } });
    }
    
    async updatePlayer(updatedPlayer: Player): Promise<Player> {
        await updatedPlayer.save();
        return updatedPlayer;
    }
}
