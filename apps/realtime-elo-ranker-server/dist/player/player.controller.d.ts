import { PlayerService } from './player.service';
export declare class CreatePlayerDto {
    id: string;
}
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    getPlayers(): Promise<import("../bd/player.entity").Player[]>;
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<import("../bd/player.entity").Player>;
}
