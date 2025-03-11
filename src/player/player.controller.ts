import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import {
  InsertJoiningPlayerData,
  RemoveLeavingPlayerData,
} from '../DTO/player.dto';

import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  getAllPlayersData(@Param('filter') filter?: string | null) {
    return this.playerService.getAllPlayersData(filter);
  }

  @Post('join')
  insertJoiningPlayerData(
    @Body(ValidationPipe) playerData: InsertJoiningPlayerData,
  ) {
    return this.playerService.insertJoiningPlayerData(playerData);
  }

  @Post('leave')
  removeLeavingPlayerData(
    @Body(ValidationPipe) playerData: RemoveLeavingPlayerData,
  ) {
    return this.playerService.removeLeavingPlayerData(playerData);
  }
}
