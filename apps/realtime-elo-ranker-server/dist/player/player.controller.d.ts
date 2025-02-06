import { PlayerService } from './player.service';
export declare class CreatePlayerDto {
    id: string;
}
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    getPlayers(): Promise<import("./player.entity").Player[]>;
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<import("./player.entity").Player>;
}
