import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlayerService } from './player.service';

export class CreatePlayerDto {
    id: string;
}

@Controller('api/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Get()
    async getPlayers() {
        return this.playerService.getPlayers();
    }
    
    @Post()
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playerService.createPlayer(createPlayerDto.id);
    }
}
