import { Player } from './player.entity';
export declare class PlayerService {
    private players;
    getPlayers(): Player[];
    createPlayer(id: string): Player;
    getPlayer(id: string): Player | undefined;
    updatePlayer(updatedPlayer: Player): Player;
}
