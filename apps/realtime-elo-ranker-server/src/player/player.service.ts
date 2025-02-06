import { Injectable } from '@nestjs/common';
import { Player } from './player.entity'; // Créer un fichier séparé pour Player

@Injectable()
export class PlayerService {
    private players: Player[] = []; 

    getPlayers(): Player[] {
        return this.players;
    }

    createPlayer(id: string): Player {
        const newPlayer = new Player(id, 1000);
        this.players.push(newPlayer);
        return newPlayer;
    }

    getPlayer(id: string): Player | undefined {
        return this.players.find(player => player.id === id);
    }
    
    updatePlayer(updatedPlayer: Player): Player {
        const index = this.players.findIndex(p => p.id === updatedPlayer.id);
        if (index !== -1) {
            this.players[index] = updatedPlayer;
        }
        return updatedPlayer;
    }
}
