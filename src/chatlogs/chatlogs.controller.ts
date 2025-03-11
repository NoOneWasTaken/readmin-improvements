import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ChatlogsService } from './chatlogs.service';
import { ChatLog } from '../DTO/chatlog.dto';

@Controller('chatlogs')
export class ChatlogsController {
  constructor(private readonly chatlogService: ChatlogsService) {}

  @Get()
  getChatlogs(
    @Param('serverId') serverId: string,
    @Param('filter') filter?: string | null,
  ) {
    return this.chatlogService.getChatlogs(serverId, filter);
  }

  @Post('register')
  registerChatlog(@Body(ValidationPipe) chatlog: ChatLog) {
    return this.chatlogService.registerChatMessage(chatlog);
  }
}
