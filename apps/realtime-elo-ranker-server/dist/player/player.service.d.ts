import { Player } from '../bd/player.entity';
import { AppService } from '../app.service';
export declare class PlayerService {
    private readonly appService;
    constructor(appService: AppService);
    getPlayers(): Promise<Player[]>;
    createPlayer(id: string): Promise<Player>;
    getPlayer(id: string): Promise<Player | null>;
    updatePlayer(updatedPlayer: Player): Promise<Player>;
}
