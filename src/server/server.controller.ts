import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { ConfigureGameServer } from '../DTO/server.dto';

import { ServerService } from './server.service';

@Controller('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  /**
   * GET api/server
   * POST api/server/configure
   * DELETE api/configure?id=string
   */

  @Get()
  async getAllOnlineGameServers() {
    return await this.serverService.getAllOnlineGameServers();
  }

  @Post('configure')
  async configureGameServer(
    @Body(ValidationPipe) serverConfig: ConfigureGameServer,
  ) {
    return await this.serverService.configureGameServer(serverConfig);
  }

  @Post('delete')
  @HttpCode(204)
  async deleteGameServer(@Headers('authorization') serverToken: string) {
    return await this.serverService.deleteGameServer(serverToken);
  }
}
